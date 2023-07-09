const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');


//Get all users

router.get("/:id", async(req, res)=>{
    try {
       const user = await User.findById(req.params.id)
       const {password, ...others} = user._doc
       res.status(200).json(others)
    } catch (err) {
       res.status(500).json(err)
    }
})

router.delete('/:id', async (req,res)=>{
    if(req.body.userId === req.params.id){
              try{   

             const user = await User.findById(req.params.id);

    
    try{
          await Post.deleteMany({username: user.username})
          await User.findByIdAndDelete(req.params.id)
          res.status(200).json('userDeleted')
                               
                   } catch(err){
                   res.status(500).json(err);
                                  } 
            }catch(err){ 
                res.status(404).json("user not found")
             }
            }
               else{
        res.status(401).json('you can delete only your account')
    }
});


module.exports = router;
