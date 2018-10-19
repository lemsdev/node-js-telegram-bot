import TelegramBot from 'node-telegram-bot-api'
import config from 'config'

const TOKEN = config.get('token');
const bot = new TelegramBot(TOKEN, { polling: true });

const user = {
  isTyping: false
}

const COMMAND_CHILL = '/chill'

bot.on('message', msg => {
  const { chat: { id }} = msg;
  if(msg.text === COMMAND_CHILL) {
    bot.sendMessage(id, 'Вижу, вы хотите провести время вместе? Прекрасно! Вы можете устроить голосование, куда вы хотели бы пойти!')
    bot.sendMessage(id, 'Чтобы создать голосование, введите команду /discuss')
    user.isTyping = true;
  }
});

bot.onText(/\/discuss/, msg => {
  const { chat: { id }} = msg;
  user.isTyping = false;
  if(user.isTyping === false) {
    bot.sendMessage(id, 'Пожалуйста, напишите в какое место вы хотели бы пойти:');
    user.isTyping = true;
  }
  bot.on('message', msg => {
    const { chat: { id }} = msg;
    if(msg.text) {
      user.isTyping = false;
      bot.sendMessage(id, `Понятно. Вы хотите пойти в ${msg.text}`);
      bot.sendMessage(id, 'Теперь напишите "+", кто желет присоединиться. Большая просьба не писать ничего лишнего!');
    }
  });
});