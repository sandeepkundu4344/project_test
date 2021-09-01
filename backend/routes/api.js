const { response, Router, request } = require('express');
const express = require('express');
const router = express.Router();
const {User} = require('../models');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const imageStorage = multer.diskStorage({   
    destination: 'uploads', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))           
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 

router.get('/', async (request, response) => {
    try {
        const users = await User.findAll();   
        response.json(users);
    } catch(err){
        console.log(err);
        response.json(err);
    }
});

router.post('/register', imageUpload.single('file'), async (request,response) => {
    try {
        let user = request.body;        
        //append file 
        user.avatar = request.file.filename;
        //encrypt password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt,(err,hash) => {
               user.password = hash;
               User.create(user)
               .then(res => {
                   response.json({
                       status:true,
                       message:"data created successfully",
                       data : res
                   });
               })
               .catch(err => {
                   response.json({
                       status:false,
                       message:"error",
                       data : err
                   },500);
               });
            });
        });                
    } catch(err) {
        console.log(err);
        response.json({
            status:false,
            message:"error",
            data : err
        },500);        
    }
});


router.post('/login', async (request, response) => {
    
    let user = await User.findOne({ where : {
         email : request.body.email
     }});    

     bcrypt.compare(request.body.password, user.password, (err, isMatch) => {   

        if(err) {
            response.json({
                status : false,
                message : "500 error",
                error:err
            },500)
        }

        if(isMatch) {
            const accessToken = jwt.sign({ user: user.email, name:user.name }, process.env.TOKEN_KEY);             
            response.json({
                user,
                accessToken
            });
        }else {
            response.json({
                status : false,
                message : "Password did not match"
            },404)
        }

    });
   
});

router.put('/:userId', async (request, response) => {
    try{
        let user = await User.findAll({ where : {
            id : request.params.userId
        }});        
        if(user.length < 1) {
            response.json({
                status:true,
                message : "user with id not found"
            });
        }

        user = request.body;
        await User.update(user, {
            where : {
                id : request.params.userId
            }
        });

        response.json({
            status:true,
            message:"updated"
        })
    }catch(err) {
        console.log(err);
        response.json({
            status:false,
            message:"error",
            data : err
        },500);
    }    
});

router.delete('/:userId', async (request, response) => {
    try {
        let user = await User.findAll({ where : {
            id : request.params.userId
        }});        
        if(user.length < 1) {
            response.json({
                status:false,
                message : "user with id not found"
            });
        }

        await User.destroy({
            where : {
                id : request.params.userId
            }           
        });
        response.json({
            status:true,
            message : "deleted"
        });
    } catch(err) {
        console.log(err);
        response.json({
            status:false,
            message:"error",
            data : err
        },500);
    }
} ); 

module.exports = router;