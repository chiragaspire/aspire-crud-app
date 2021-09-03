const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const path = require('path');
const sharp = require('sharp');
const multer = require('multer');
const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
             cb({ error: "Please upload image" }, false);
        }

        cb(undefined, true,file)
    }
})

router.post('/testing',upload.single('profile'),  async (req, res) => {
    console.log(req.file);
    
    res.send("sfdf")
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
// router.post('/testing',upload.single('profile') ,(req, res) => {
//     console.log(req.file.buffer)
//     res.status(200).send("Sfddsfd");
// })

router.post('/register',upload.single('profile'), async(req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.json({ error: "file not found" });
    }
    console.log(req.file)
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        usertype: req.body.usertype,
        image:buffer
    });
    console.log(user);
    try {
        await user.save()
        // const token=await user.generateToken()
        res.status(201).send(user)
    }
    catch (e) {
        if (e.name === 'MongoError') {
            return res.json({ error:"Email is already in database",type:"email"})
        }
        
        res.json({ error: "error" })
    }
   
}, (error, req, res, next) => {
   res.json({error:error.error}) 
})

router.get('/users/:email/avatar', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        console.log(user)
        if (!user || !user.image) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.image)
        
    } catch (e) {
        res.send(e)
    }
    
})

router.post('/login', async(req, res) => {
    console.log(req.body)
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (!user ) {
            throw new Error()
        }
        const ismatch = await bcrypt.compare(req.body.password, user.password)
        if (!ismatch ) {
            throw new Error()
        }
        const usertype = user.usertype;
        const token = await user.generateToken();
        res.status(200).send({user,token,usertype});
    } catch (error) {
        
        res.status(400).send({error:"Invalid Username or Password!"});
    }
    
})

router.get('/getUsers/me',auth, async(req, res) => {
    
    try {  
        // console.log(req.user)
        // const user=await User.findOne({email:req.params.email})
        res.status(200).send(req.user);
    } catch (error) {
        res.status(500).send({error:"failed to find users"});
    }
    
})

router.get('/getdata/:email',auth,async(req,res)=>{
    try {
        if (!req.user) {
            throw new Error("Please Authenticate!!");
        }
        
        const user=await User.findOne({email:req.params.email});
    if(!user){
        throw new Error("User Not Found!!!");
    }
 

     res.status(200).send(user);
    }catch(e){
        console.log(e)
        res.status(400).send({error:e});
    }
    
})

router.get('/admingetdata',auth,async(req, res) => {
    
    try {  
        // console.log(req.user)
        const user=await User.find({})
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({error:"failed to find users"});
    }
    
})


router.patch('/updateUser/me',auth,upload.single('image'), async(req, res) => {
    const updates = Object.keys(req.body);
   
    const allowUpdates = ['name', 'email', 'password',];
    const isValidateField = updates.every((update) => {
        return allowUpdates.includes(update);
    })
    
    if (!isValidateField) {
        return res.json({ error: "Please update valid field!" });
    }
   
        try {
        
            updates.forEach((update) => req.user[update] = req.body[update])
            console.log(req.file)
            if (req.file) {
                const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
        
                req.user.image=buffer
            }
            await req.user.save();
    
            res.status(200).json(req.user);
        } catch (error) {
            
            res.json({error:"Failed to update information"});
        }
   
    
})

router.patch('/updateEmployee/:email',upload.single('image'), async(req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'email', 'password'];
    const isValidateField = updates.every((update) => {
        return allowUpdates.includes(update);
    })
    console.log(isValidateField);
    if (!isValidateField) {
        return res.status(400).send("Please update valid field!");
    }
    
    try {
        
        const user=await User.findOne({email:req.params.email});
        if(!user){
            throw new Error("User not found");
        }
        updates.forEach((update)=> user[update]=req.body[update])
        if (req.file) {
            const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
    
            user.image=buffer
        }
        await user.save();

        res.status(200).send(user);
    } catch (error) {
        console.log(error)
        res.json({error:"Failed to update information"});
    }

})

router.post('/logout/me', auth, async(req, res) => {
    try {
        req.user.tokens = await req.user.tokens.filter((tokens) => {
            return tokens.token !== req.token
         })
        await req.user.save()
        res.status(201).send(req.user);
    } catch (error) {
        res.status(500).send({ error: error });
    }
})

router.delete('/deleteUser/me',auth, async(req, res) => {
    
    try {
        if (!req.user) {
            return res.status(404).send();
          }
        await req.user.remove();
        
        
         res.status(200).send(req.user);
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Failed to update information"});
    }
})



router.delete('/deletebyadmin/:email',async(req,res)=>{
    try{
        console.log(req.params.email)
        const user=await User.findOne({email:req.params.email});
    if(!user){
        throw new Error("User Not Found!!!");
    }
    console.log(user)
    
    await user.remove();
     res.status(200).send(user);
    }catch(e){
        console.log(e)
        res.status(400).send({error:e});
    }
    
})

module.exports = router;