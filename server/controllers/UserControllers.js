const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "aklajdhkj5482()y285kh@lksjkf%lslg%%sdsf23500sf";

// // module.exports.userSignup = async (req, res) => {
// //     const { userEmail, userPwd } = req.body;
    
// //     try {
// //         const check = await UserModel.findOne({ userEmail });

// //         if (check) {
// //             res.json("exist");
// //         } else {
// //             await UserModel.create({ userEmail, userPwd});
// //             res.json("notexist");
// //         }
// //     } catch(e) {
// //         res.json("notexist");
// //     }
// // };


// // module.exports.userSignin = async (req, res) => {
// //     const { userEmail, userPwd } = req.body;

// //     try {
// //       const check = await UserModel.findOne({ userEmail });
  
// //       if (check) {
// //         res.json("exist");
// //     } else {
// //       res.json("notexist");
// //     }


// //     } catch (e) {

// //       res.json("notexist")
// //     } 
// // };


// module.exports.getUserByID = async (req, res) => {
//   UserModel.findById(req.params.id).exec().then((res) => {
//     return res.status(200).json({
//       success: true,
//       existingDetails: results
//     })
//   }).catch((err) =>{
//     console.error(err)
//   })
// };



//signup API
module.exports.userSignup = async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword=await bcrypt.hash(password, 60*60*1000);
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