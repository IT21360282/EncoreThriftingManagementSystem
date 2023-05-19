const CommentsModel = require('../models/CommentsModel');


//get comments
module.exports.getComments = async (req, res) => {
    try {
       const comments = await CommentsModel.find();
       res.send(comments);
    } catch (error) {
       console.error(error);
       res.status(500).send("Server Error");
    }
 }

 //add comments
 module.exports.saveComment = async (req, res) => {
    const { 
        userId,
        itemId,
        fullName,
        comment, 
     } = req.body;

     try {
        const newComment = new CommentsModel({
            userId,
            itemId,
            fullName, 
            comment
        });
        const savedComment = await newComment.save(); 
        //save to db and return the objectId of the new object
        console.log("Add new comment successfully...");
        res.status(201).send(savedComment);
     } catch (error) {
        console.error(error);
        res.status(500).send("Faild to add comment");
     }
}

//delete comment
module.exports.deleteComment = async (req, res) => {
    try {
       const deleteComment = await CommentsModel.findByIdAndRemove(req.params.id).exec();
       return res.json({
          message: "Comment Deleted",
          deleteComment
       });
    } catch (err) {
       return res.json({
          message: "Deletion Failed",
          error: err
       });
    }
 }

 //update a comment
 module.exports.updateComment = async (req, res) => {
   try {
      const comment = await CommentsModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
      return res.status(200).json({
         success: 'Comment Updated Successfully',
         comment,
       });
   } catch (err) {
      return res.status(400).json({
         error: err.message,
      });
   }
 }