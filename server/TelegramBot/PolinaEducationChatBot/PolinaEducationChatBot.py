import time
import telebot
from keyboa import Keyboa
import pymongo
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton

# Создаем экземпляр бота
bot = telebot.TeleBot('5197185385:AAHaHf5WvKXrQ5ezq_UszbAR-HKNLQ0zxRE')

personal_access_token = "1/1201721531261001:a0344891455630f93a031df03ac17b0c"
client = pymongo.MongoClient("mongodb://Admin:555552026Zz1010@2.59.43.6:27017/?authSource=admin")
db = client.ChatBotChannels

user_dict = {}


class Channels:
    def __init__(self, user_id):
        self.user_id = user_id
        self.channels = []
        self.button_channels = []
        self.forward_channel_id = ""
        self.user_message_id = ""
        self.user_message = ""
        self.channel_name = ""


@bot.message_handler(commands=['start'])
def send_welcome(message):
    if message.chat.type == "private":
        check_channels(message)


@bot.callback_query_handler(func=lambda call: True)
def callback_inline(call):
    chat_id = call.message.chat.id
    message_id = call.message.message_id
    user = user_dict[chat_id]
    if call.data in user.button_channels:
        for i in range(len(user.button_channels)):
            if user.channels[i]["name"] == call.data:
                user.forward_channel_id = user.channels[i]["channel_id"]
                user.channel_name = user.channels[i]["name"]
        msg = bot.edit_message_text(chat_id=chat_id,
                                    message_id=message_id,
                                    text=f"Вы выбрали для публикации канал <b>«{user.channel_name}»</b>. "
                                         f"Напишите свое сообщение <b>полностью</b> и отправьте его сюда."
                                         f"\n<b>Рекомендуемые теги:</b>"
                                         f"\n#вопрос - вопрос другим родителям"
                                         f"\n#совет - для ваших рекомендаций друг другу "
                                         f"\n#отзыв - для отзывов родителей о садах / школах / лагерях / курсах и др",
                                    parse_mode='HTML')
        bot.register_next_step_handler(msg, process_check_msg_step)
    elif call.data == "Отправить":
        forward = bot.forward_message(user.forward_channel_id, chat_id, user.user_message_id)
        print("forward: " + str(forward))
        post_id = str(forward.id)
        channel_id = str(forward.chat.id)[4:]
        forward_date = forward.forward_date
        post_link = f'<a href="https://t.me/c/{channel_id}/{post_id}">ссылке</a>'
        db.posts.insert_one({
            "user_id": user.user_id,
            "channel_id": user.forward_channel_id,
            "post_id": post_id,
            "message_id": user.user_message_id,
            "message": user.user_message,
            "notification": False,
            "message_chat_id": "",
            "forward_date": forward_date
        })
        bot.edit_message_text(chat_id=chat_id,
                              message_id=message_id,
                              text=f"Ваше сообщение успешно отправлено. Посмотреть его можно по {post_link}.",
                              parse_mode='HTML')
        check_channels(call)
    elif call.data == "Написать заново":
        msg = bot.edit_message_text(chat_id=chat_id,
                                    message_id=message_id,
                                    text=f"Вы выбрали для публикации канал <b>«{user.channel_name}»</b>. "
                                         f"Напишите свое сообщение <b>полностью</b> и отправьте его сюда.",
                                    parse_mode='HTML')
        bot.register_next_step_handler(msg, process_check_msg_step)
    else:
        bot.send_message(chat_id, 'Произошла ошибка')


def check_channels(message):
    try:
        print("callback " + str(message))
        chat_id = message.chat.id
        user_id = message.from_user.id
        user = Channels(user_id)
        user_dict[chat_id] = user
    except:
        chat_id = message.message.chat.id
        user_id = message.from_user.id
        user = Channels(user_id)
        user_dict[chat_id] = user
    link = '<a href="https://school.polina-education.ru/pl/teach/control/lesson/view?id=224012738&editMode=0">ссылке</a>'
    for item in db.Chats.find():
        channel_id = str(item["channel_id"])
        channel_name = item["name"]
        try:
            channel_member = bot.get_chat_member(channel_id, user_id).status in ['member', 'administrator', 'creator']
            if channel_member:
                user.channels.append({
                    "channel_id": channel_id,
                    "name": channel_name,
                })
        except:
            pass
    if len(user.channels) == 0:
        bot.send_message(chat_id, f"Приветствую! Вы не присоединились ни к одному каналу родительского сообщества. "
                                  f"Выбрать канал и присоединиться к нему можно по {link}.", parse_mode='HTML')
    else:
        for i in range(len(user.channels)):
            user.button_channels.append(user.channels[i]["name"])
        kb_channels = Keyboa(items=user.button_channels, copy_text_to_callback=True)
        bot.send_message(chat_id, "Приветсвую! Выберите канал для публикации вашего сообщения.",
                         reply_markup=kb_channels())


def process_check_msg_step(message):
    print(message)
    chat_id = message.chat.id
    message_id = message.id
    message_text = str(message.text)
    user = user_dict[chat_id]
    user.user_message_id = message_id
    user.user_message = message_text
    print(user.user_message)
    switch_keyboard = InlineKeyboardMarkup()
    switch_keyboard.add(InlineKeyboardButton(
        text="Отправить",
        callback_data="Отправить"))
    switch_keyboard.add(InlineKeyboardButton(
        text="Написать заново",
        callback_data="Написать заново"))
    bot.send_message(chat_id=chat_id,
                     text=f"<b>Ваше сообщение:</b>"
                          f"\n{user.user_message}",
                     parse_mode='HTML',
                     reply_markup=switch_keyboard)


@bot.message_handler(func=lambda m: True)
def notification(message):
    try:
        is_automatic_forward = message.is_automatic_forward
        if is_automatic_forward:
            message_chat_id = message.message_id
            forward_from_user_id = message.forward_from.id
            sender_from_chat = message.sender_chat.id
            forward_date = message.forward_date
            forward_message_text = message.text
            if is_automatic_forward:
                filter_forward_posts = {
                    "user_id": forward_from_user_id,
                    "channel_id": str(sender_from_chat),
                    "forward_date": forward_date,
                    "notification": False,
                    "message": str(forward_message_text)

                }
                find_forward_post = db.posts.find_one(filter_forward_posts)
                if find_forward_post:
                    db.posts.update_one(filter_forward_posts, {"$set": {'message_chat_id': message_chat_id}})
        else:
            channel_id = str(message.reply_to_message.sender_chat.id)[4:]
            message_id = message.reply_to_message.id
            from_channel_id = message.reply_to_message.sender_chat.id
            creator_user_id = message.reply_to_message.forward_from.id
            filter_posts_chat_id = {
                "user_id": creator_user_id,
                "channel_id": str(from_channel_id),
                "notification": False,
                "message_chat_id": message_id
            }
            find_post = db.posts.find_one(filter_posts_chat_id)
            if find_post:
                db.posts.update_one(filter_posts_chat_id, {"$set": {'notification': True}})
                time.sleep(86400)
                # time.sleep(10)
                bot.send_message(creator_user_id, 'На ваше сообщение есть ответ: https://t.me/c/' + str(
                    channel_id) + "/" + str(find_post["post_id"]))
    except:
        pass


bot.enable_save_next_step_handlers(delay=2)

bot.load_next_step_handlers()

bot.infinity_polling()
