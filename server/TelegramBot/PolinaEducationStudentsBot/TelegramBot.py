import telebot

# Создаем экземпляр бота
bot = telebot.TeleBot('5197185385:AAHaHf5WvKXrQ5ezq_UszbAR-HKNLQ0zxRE')


# https://t.me/PolinaEducationChat_bot?start=maildron_yandex_ru
# Функция, обрабатывающая команду /start
@bot.message_handler(commands=["start"])
def start(message):
    print(message.chat.id)
    email_split = message.text.replace("/start ", "").split("_")
    if email_split[0] == "/start":
        bot.send_message(message.chat.id, "Произошла ошибка")
    else:
        email_result = email_split[0] + "@" + email_split[1] + "." + email_split[2]
        bot.send_message(message.chat.id, "Ваша ссылка на чат " + email_result)


@bot.message_handler(content_types=['new_chat_members'])
def new_member(message):
    user_tg_id = message.new_chat_members[0].id
    #print(message.new_chat_members.id)
    print(user_tg_id)
    bot.reply_to(message, "Приветствую." + str(user_tg_id))


# Запускаем бота
bot.polling(none_stop=True, interval=0)
