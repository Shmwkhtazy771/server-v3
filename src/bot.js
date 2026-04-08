const TelegramBot = require('node-telegram-bot-api');

const setupBot = () => {
  const token = process.env.TELEGRAM_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_TOKEN is missing in environment variables");
  }

  // إنشاء نسخة البوت
  const bot = new TelegramBot(token, { polling: true });

  console.log("Telegram bot is being initialized...");

  // رسالة ترحيبية عند تشغيل البوت
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome! Your RAT C2 Server is active.");
  });

  return bot;
};

module.exports = { setupBot };
