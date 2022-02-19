const mongoose = require("mongoose");
const salon = require("./Salon")

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

uri = "mongodb+srv://root:root@cluster0.m2cf1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, () => {
    console.log("MongoDB connected");
}, e => console.error(e));


async function saveSalon(salonToCreate) {
    //Prefered way:
    try {
        const test = new salon(
            {
                salonName: salonToCreate.salonName,
                messages: salonToCreate.messages,
                users: salonToCreate.users
            });

        await test.save();
    } catch (e) {
        console.log(e.message)
    }



}
async function updateMessages(salonName, messages) {
    try {
      
        const updateSalon = await salon.findOne({ salonName: salonName })
        updateSalon.messages.push(messages);
        await updateSalon.save();
        console.log("return value", updateSalon)

    } catch (e) {
        console.log("UpdateMessages error:", e.message)
    }

}

async function findSalon(salonName) {
    try {
        const s = await salon.findOne({ salonName: salonName })
        console.log("retriveSalon here", s)
    } catch (e) {
        console.log("findSalon error:", e.message)
    }
    return s;
}

async function updateUsers(salonName) {
    try {
        const retriveSalon = await salon.find({ saloName: salonName })
        console.log(retriveSalon)
    } catch (e) {
        console.log("UpdateUser error:", e.message)
    }

}

async function deleteSalon(salonName) {
    try {
        const response = await salon.deleteOne({ salonName: salonName })
        console.log("Here the response",response)
    } catch (e) {
        console.log(e.message)
    }

}

async function userExistFindAllSalon(username) {
    const returnSalon = [];
    try {
        const rs = await salon.find()
        console.log(rs)
        rs.map(salon => {
            if (salon.users.includes(username)) {
                returnSalon.push(salon);
            }
        })

    } catch (e) {
        console.log("findSalon error:", e.message)
    }
    return returnSalon;
}


module.exports = {
    saveSalon,
    updateMessages,
    updateUsers,
    deleteSalon,
    findSalon,
    userExistFindAllSalon
}