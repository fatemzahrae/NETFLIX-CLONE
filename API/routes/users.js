const router = require("express").Router();
const User = require("../models/User").default;
const cryptoJS = require("crypto-js");
const verify = require("../verifyToken")


//UPDATE 
router.put("/:id",async (req,res) =>{
    if (req.user.id === req.params.id || req.user.isAdmin){
        if (req.body.password) {
            req.body.password =  cryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()
        }
        try{
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                 {$set: req.body,},
                 {new: true } 
            )
        res.status(200).json(updateUser)
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you can only update your account")
    }
})


//DELETE
router.delete("/:id",async (req,res) =>{
    if (req.user.id === req.params.id || req.user.isAdmin){
        try{
           await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted")
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you can only delete your account")
    }
})

//GET
router.get("/find/:id",async (req,res) =>{
    if (req.user.id === req.params.id || req.user.isAdmin){
        try{
        const user = await User.findById(req.params.id)
        const { password, ...info} = user._doc
        res.status(200).json(user)
        }catch(err){
            res.status(500).json(err)
        }
    }
})

//GET ALL
router.get("/",async (req,res) =>{
    const query = req.query.new;
    if ( req.user.isAdmin){
        try{
           const users = query ? await User.find().limit(10) : await User.find() ;
            res.status(200).json(users)
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you are not allowed to see all yours")
    }
})

//GET USER STATS
router.get("/stats", async (req,res)=> {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() -1);

    const monthsArray = [
        "january",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    try{
        const data = await User.aggregate([
            {
                $project:{
                    month: {$month: "$createAt"}
                }
            },{
                $group: {
                    _id: "$month",
                    total: { $sum: 1},
                }
            }

        ])
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports = router ; 
