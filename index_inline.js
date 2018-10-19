import TelegramBot from 'node-telegram-bot-api'
import config from 'config'

const TOKEN = config.get('token');
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('inline_query', query => {
  console.log(query);

  const results = [];

  for(let i = 0; i < 3; i++) {
    results.push({
      id: i.toString(),
      type: 'article',
      title: `Title #${i}`,
      input_message_content: {
        message_text: `Article #${i}, description should be here`
      }
    })
  }

  bot.answerInlineQuery(query.id, results, {
    cache_time: 0,
    switch_pm_text: 'Talk directly',
    switch_pm_parameter: 'hello'
  })
})

bot.on('callback_query', query => {
  bot.answerCallbackQuery(query.id, `Alert message is here: "${query.data}"`)
})

bot.onText(/\/start (.+)/, (msg, [source, match]) => {
  const { chat: { id }} = msg

  bot.sendMessage(id, `You told me "${match}" and I'm glad to see you here ;)`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Google',
            url: 'https://google.com'
          }
        ],
        [
          {
            text: 'Back to the chat you came from',
            switch_inline_query: 'Hello again!'
          }
        ],
        [
          {
            text: 'Stay here and talk to me again',
            switch_inline_query_current_chat: `It's love`
          }
        ],
        [
          {
            text: 'Show alert message',
            callback_data: 'Hello world!'
          }
        ]
      ]
    }
  })
})