const {dialogsService} = require('../../services')


module.exports = {

    readAllMessages: async (req, res) => {
        const {dialog} = req.body
        let messagesArr = await dialogsService.findOneDialog(dialog)


        if(messagesArr) {
            messagesArr.message.map(el => {
                if(!el.read) {
                    el.read = true
                }
            })
        }


        await dialogsService.updateMessages(dialog, messagesArr.message)

        res.json(messagesArr.message)

    }
}