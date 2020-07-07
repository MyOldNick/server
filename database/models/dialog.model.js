const {Schema, model} = require('mongoose');

//да, колхоз, но так устроена жЫзнь. Нормально архитектуры БД нет, ибо лень заморачиваться. Тут не будет 1005002281488 человек онлайн
//здесь еще нужно добавить поля "обновлено тагдата" и "новыесабщеньки" для того, чтобы сортировать диалоги на клиенте и сделать счетчик новых сообщений

const dialogSchema = new Schema({
    users: [
        {userId: String, name: String}
        ],
    message: [{
        id: String,
        text: String,
        author: String
    }],
    quantityNew: {
        type: Number,
        default: 0
    },
    updateAt: {
        type: Date,
        default: Date.now
    }

})
module.exports = model('dialog', dialogSchema);
