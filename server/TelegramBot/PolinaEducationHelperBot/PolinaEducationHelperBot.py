import telebot
from telebot import types
import asana

# Создаем экземпляр бота
bot = telebot.TeleBot('5347254143:AAG1BnB7t7I2u5zZI3lS0tYiOAXlBvOvO50')

personal_access_token = "1/1201721531261001:a0344891455630f93a031df03ac17b0c"

client = asana.Client.access_token(personal_access_token)

user_dict = {}


class Task:
    def __init__(self, task_name):
        self.task_name = task_name
        self.task_description = None


# Handle '/start' and '/help'
@bot.message_handler(commands=['start'])
def send_welcome(message):
    msg = bot.reply_to(message, """\
Приветствую, напишите название задачи
""")
    bot.register_next_step_handler(msg, process_name_step)


def process_name_step(message):
    try:
        chat_id = message.chat.id
        task_name = message.text
        user = Task(task_name)
        user_dict[chat_id] = user
        msg = bot.reply_to(message, 'С какой проблемой столкнулись?')
        bot.register_next_step_handler(msg, process_task_description_step)
    except Exception as e:
        bot.reply_to(message, 'oooops')


def process_task_description_step(message):
    try:
        chat_id = message.chat.id
        task_description = message.text
        user = user_dict[chat_id]
        user.task_description = task_description
        result = client.tasks.create_in_workspace('1200921397755202',
                                                  {'name': user.task_name,
                                                   'notes': user.task_description,
                                                   'projects': '1202291931632630'})
        bot.send_message(chat_id, 'Спасибо, заявка в обработке')
    except Exception as e:
        bot.reply_to(message, e + 'oooops')


bot.enable_save_next_step_handlers(delay=2)

bot.load_next_step_handlers()

bot.infinity_polling()
