import AsyncHandler from 'express-async-handler'
import User from '../modals/userModal.js';
import generateToken from '../utils/generateToken.js';


const authAdmin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log('Received credentials:', email, password);
  const user = await User.findOne({ email: email });
  if (user && user.isadmin) {
      res.status(201).json({
          _id: user._id,
          name: user.name,
          img: user.img,
          adminToken: generateToken(user._id),
      });
  } else {
      console.log('Invalid credentials')
      
      res.status(401).json({ message: 'Invalid credentials' });
  }
});


const getUsers =AsyncHandler(async(req,res)=>{
    const users = await User.find({name: { $ne: "admin" }, __v:0})
    if(users){
        res.status(201).json(users)
    }else{
        throw new Error('Invalid error')
    }
})

const searchUser = AsyncHandler(async (req,res)=>{
    const users = await User.find({name : {$regex: new RegExp(req.body.name, 'i')} , __v:0})
    if(users){
    res.status(201).json(users)
    }else{
        throw new Error('Invalid error')
        } 
})

const Delete = AsyncHandler(async(req,res)=>{
    const user =await User.findById(req.params.id)
    if(user){
        await user.deleteOne({_id : user._id})
        res.status(201).json({msg:'deleted..'})
    }else{
        throw new Error('Invalid Error')
    }
})

const UpdateUser = AsyncHandler(async(req,res)=>{
   const user =await User.findById(req.params.id)
    if(user){
     await user.updateOne({
            name : req.body.name,
            age:req.body.age,
            email:req.body.email,
            location:req.body.location,
            job:req.body.job
        })
        res.status(201).json({msg:'updated..'})
    }else{
        throw new Error('Invalid Error')
    } 
})

const AddUser = AsyncHandler(async (req, res) => {
    const { email,name,age,location,job } = req.body;
    const password = 111
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400);
    throw new Error("User exists");
    }
    const newUser = await User.create({
      name,
      email,
      age,
      location,
      job,
      password,
    });
  
    if (newUser) {
      res.status(201).json({
        msg :' user created.. '
      });
    } else {
      res.status(400);
      throw new Error("Invalid userData");
    }
});


export {authAdmin,getUsers,searchUser,Delete,UpdateUser,AddUser}