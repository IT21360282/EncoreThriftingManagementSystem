const express = require('express')
const mainCategoryModel = require('../../models/stock/modelMainCategory')
const subCategoryModel = require('../../models/stock/modelItemNew')
const damagedItemModel = require('../../models/stock/modelDamagedItem')
const disposedItemModel =require('../../models/stock/modelDisposedItem')
const releasedItemModel = require('../../models/stock/modelReleasedItem')
const lowStockModel = require('../../models/stock/modelStockLowItems')
const imageDetails = require('../../models/stock/imageDetails')

const nodemailer = require('nodemailer');



const router = express.Router()

router.post('/maincategory/post', (req, res) => {
    let newMainCategory = new mainCategoryModel(req.body)

    newMainCategory.save().then(() => {
        console.log('category details are saved successfully')
        return res.status(200).json({
            success: "category details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        });
    });
});




router.post('/subcategory/post', (req, res) => {
    let newSubCategory = new subCategoryModel(req.body)

    newSubCategory.save().then(() => {
        console.log('sub category details are saved successfully')
        return res.status(200).json({
            success: "sub category details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        });
    });
});



 router.post("/upload-image",async(req,res)=>{
    const {base64} = req.body;

    try{

        imageDetails.create({image:base64})
        
        res.send({Status:"ok"})
    }catch(error){
        res.send({
            Status:"error",data:error
        });
    }
  })


router.post('/damageditem/post', (req, res) => {
    let newDamagedItem = new damagedItemModel(req.body)

    newDamagedItem.save().then(() => {
        console.log('Damaged Item details are saved successfully')
        return res.status(200).json({
            success: "Damaged Item details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        });
    });
});

router.post('/disposeditem/post', (req, res) => {
    let newDisposedItem = new disposedItemModel(req.body)

    newDisposedItem.save().then(() => {
        console.log('Disposed Item details are saved successfully')
        return res.status(200).json({
            success: "Disposed Item details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        });
    });
});


router.post('/releaseditem/post', (req, res) => {
    let newLowStockItem = new releasedItemModel(req.body)

    newLowStockItem.save().then(() => {
        console.log('Released Item details are saved successfully')
        return res.status(200).json({
            success: "Released Item details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        });
    });
});


router.post('/lowstock/post', (req, res) => {
    let newLowStockItem = new lowStockModel(req.body)

    newLowStockItem.save().then(() => {
        console.log('Released Item details are saved successfully')
        return res.status(200).json({
            success: "Released Item details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        });
    });
});



router.post('/newitem/post', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        let newSubCategory = new subCategoryModel(req.body);
        if (req.file) {
          newSubCategory.photo.data = fs.readFileSync(req.file.path);
          newSubCategory.photo.contentType = req.file.mimetype;
        }
        newSubCategory.save().then(() => {
          console.log('Subcategory details saved successfully');
          return res.status(200).json({
            success: 'Subcategory details saved successfully'
          });
        }).catch((err) => {
          console.error(err);
          return res.status(400).json({
            error: err
          });
        });
      }
    });
  });






  router.post("/upload-image",async(req,res)=>{
    const {base64} = req.body;

    try{

        imageDetails.create({image:base64})
        
        res.send({Status:"ok"})
    }catch(error){
        res.send({
            Status:"error",data:error
        });
    }
  })


  /* Send Emails to stakeholders */
router.post('/sendEmailInventory/post', (req, res) => {
    
    const inventoryReciver = req.body.inventoryReciver
    const inventorySubject = req.body.inventorySubject
    const inventoryMsg = req.body.inventoryMsg

    const Mailer = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'encorethriftinglk@gmail.com',
            pass: 'w i f s p e p a h w e h j e v w'
        }
    })

    const mailOptions = {
        from: 'encorethriftinglk@gmail.com',
        to: inventoryReciver,
        subject: inventorySubject,
        text: `${inventoryMsg}\n\nThis is a auto generated email and send by Inventory Manager of Encore Thrifting Store.Please let me know if you have any questions or concerns. I look forward to hearing back from you soon.\n\nThank you for considering our inquiry.\n\nBest regards,\nGeeshan\n\nEncore - Thrift Store\n\nencorethriftinglk@gmail.com`
    }

    Mailer.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error Occurred When Sending Email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email Sent Successfully');
    }
    })
})

  
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload-image', upload.single('file'), (req, res) => {
  const fileData = req.file.buffer;
  const image = new Image({
    data: fileData,
    contentType: req.file.mimetype
  });
  image.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error uploading image');
    } else {
      res.status(200).send('Image uploaded successfully');
    }
  });
});



















module.exports = router