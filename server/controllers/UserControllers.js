const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "aklajdhkj5482()y285kh@lksjkf%lslg%%sdsf23500sf";


//signup API
module.exports.userSignup = async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword=await bcrypt.hash(password, 10);
  try {
      const oldUser= await User.findOne({ email });

      if (oldUser) {
         return res.send({error:"User Exist"});
      }
      await User.create({
          fname,
          lname,
          email,
          password: encryptedPassword,
      });
      res.send({status:"ok"});
  } catch (err) {
      res.send({status:"error"});
  }
};

//signin API
module.exports.userSignin =  async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
      return res.send({error:"User Not Found"});
   }
   if(await bcrypt.compare(password,user.password)) {
      const token = jwt.sign({email:user.email}, JWT_SECRET,{
          expiresIn: 60*60*1000,
      });

      if(res.status(201)){
          return res.json({ status: "ok", data: token});
      } else {
          return res.json({ error: "error" });
      }
   }
   res.json({ status: "error", error: "Invalid Password" });
};

//userData
module.exports.userData = async (req, res) => {
  const { token } = req.body;
  // console.log(user);
  try {
      const user = jwt.verify(token,JWT_SECRET, (err, res)=>{
          if (err) {
              return "token expired";
          }
          return res;
      });
      console.log(user);
      if (user=="token expired"){
          return res.send({ status: "error", data: "token expired" })
      }
      const useremail = user.email;
      User.findOne({ email: useremail }).then((data) => {
          res.send({ status: "ok", data: data});
      })
      .catch((error) => {
          res.send({ status: "error", data: error });
      });
  } catch (error) {
    res.redirect('/Signin'); 
  }
};

//get user by id
module.exports.getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).exec();
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ success: true, user });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  
//update user details
module.exports.updateUser = async (req, res) => {
  try {
    const { mobile, dob, address } = req.body;

    const updatedFields = {};

    if (mobile) {
      updatedFields.mobile = mobile;
    }

    if (dob) {
      updatedFields.dob = dob;
    }

    if (address) {
      updatedFields.address = address;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    return res.status(200).json({
      success: "User information updated",
      updatedUser,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

//delete user
module.exports.deleteUserById = async (req, res) => {
  try{
    const deleteUser = await User.findByIdAndRemove(req.params.id).exec();
    return res.json({
      message: "User Deleted",
      deleteUser,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Deletion Failed",
      error: err
    })
  }
}