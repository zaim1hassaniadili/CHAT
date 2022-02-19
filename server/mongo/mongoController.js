const express = require("express");
const mongoHandler = require("./mongoHandler")
const router = express.Router();


router.get("/userExist/:username", async (req, res)=>{
    const username = req.params.username;
    if(username){
        returnValue = await mongoHandler.userExistFindAllSalon(username);
        console.log("the return value",returnValue)
        res.send(returnValue);
    }
    res.send();
 
})

router.delete("/deleteSalon/:salonname", async (req, res)=>{
    const salonName = req.params.salonname;
    console.log(req.params)
    console.log("in the delete controller", salonName)
    if(salonName){
        await mongoHandler.deleteSalon(salonName);
    }
   
})

module.exports = router;