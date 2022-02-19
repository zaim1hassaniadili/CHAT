const mongoose = require("mongoose");


/*
let mainSalon = {
    salonName: "Main",
    messages: [],
    users: ["Tabita", "Morro"]
}

 let messageObject ={
     salonname:"name the actuall Salon",
     userNickname:"the user unique id",
     timeStamps:"When the message was emitted",
     textMessage:"the actual exchange"
 }
*/

const messageSalon = new mongoose.Schema({
    salonname: String,
    userNickname: Date,
    timeStamps: Date,
    textMessage: String

})

const salonSchema = new mongoose.Schema({
    salonName: String,
    messages: [
        {
            salonname: String,
            userNickname: String,
            timeStamps: Date,
            textMessage: String
        }
    ],
    users: [String]

})

salonSchema.methods.addMMessage = function (msg) {
   // this.messages.push(msg);
    console.log("Hello messageSalon", this)
}

module.exports = mongoose.model("Salon", salonSchema)