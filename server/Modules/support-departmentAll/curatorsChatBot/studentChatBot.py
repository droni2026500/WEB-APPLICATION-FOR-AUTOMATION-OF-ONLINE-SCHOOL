import pymongo
import telebot

# Создаем экземпляр бота
bot = telebot.TeleBot('5595292820:AAGtO_Lz_1jI_d5kO_beKhS8AONW1wQ1iZU')
client = pymongo.MongoClient("mongodb://admin1:admin1@213.183.53.93:27019/support-department?authSource=support-department")
db = client.curators


# https://t.me/PolinaEducationChat_bot?start=maildron_yandex_ru
# Функция, обрабатывающая команду /start
@bot.message_handler(commands=["start"])
def start(message):
    user_id = message.from_user.id
    student_id = message.text.replace("/start ", "")
    if student_id == "/start":
        bot.send_message(message.chat.id, "Перейдите в данный чат по ссылке из урока!")
    else:
        student = db.students.find_one({"user_id": student_id})
        if student:
            db.students.update_one({'user_id': student_id}, {'$set': {'tg_id': user_id}})
            link = student["link"]
            bot.send_message(message.chat.id, f"Ваша ссылка на чат: {link}")
        else:
            bot.send_message(message.chat.id,
                             "Произошла ошибка, обратить в техническую поддржку по ссылке https://school.polina-education.ru/pl/talks/conversation")


@bot.message_handler(content_types=['new_chat_members'])
def new_member(message):
    user_tg_id = message.new_chat_members[0].id
    # print(message.new_chat_members.id)
    print(user_tg_id)
    bot.reply_to(message, "Приветствую." + str(user_tg_id))


# Запускаем бота
bot.polling(none_stop=True, interval=0)
