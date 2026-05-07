require('dotenv').config();
const { Bot } = require('grammy');

// Перевірка наявності токена
if (!process.env.BOT_TOKEN || process.env.BOT_TOKEN === 'YOUR_TELEGRAM_BOT_TOKEN_HERE') {
    console.error('Помилка: Будь ласка, додайте ваш токен у файл .env');
    process.exit(1);
}

const bot = new Bot(process.env.BOT_TOKEN);

// /start - привітання та опис
bot.command('start', (ctx) => {
    ctx.reply('Привіт! Я ваш новий Telegram-бот.');
});

// /help - список команд
bot.command('help', (ctx) => {
    ctx.reply('Доступні команди:\n/start - Початок роботи\n/help - Список команд\n/joke - Розповісти жарт\n/about - Про бота');
});

// Власна команда /joke
bot.command('joke', (ctx) => {
    const jokes = [
        'Чому програмісти не люблять природу? Бо там забагато багів.',
        'Скільки програмістів потрібно, щоб змінити лампочку? Жодного, це апаратна проблема.',
        'Програміст іде спати і ставить на тумбочку дві склянки: одну з водою (якщо захоче пити), іншу порожню (якщо не захоче).'
    ];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    ctx.reply(randomJoke);
});

// Власна команда /about
bot.command('about', (ctx) => {
    ctx.reply('Цей бот створений для домашнього завдання.');
});

// Обробка текстових повідомлень (bonus features)
bot.on('message:text', async (ctx) => {
    const text = ctx.message.text.toLowerCase();

    // Привітання
    if (text === 'hello' || text === 'привіт') {
        return ctx.reply('Привіт, як справи?');
    }

    // Підказка про /help
    if (text === 'help' || text === 'допомога') {
        return ctx.reply('Схоже, вам потрібна допомога. Використовуйте команду /help для перегляду списку доступних функцій.');
    }

    // Ехо-відповідь для будь-якого іншого повідомлення
    await ctx.reply(`Я отримав твоє повідомлення: ${ctx.message.text}`);
});

// Запуск бота
bot.start();
console.log('Бот запущений...');
