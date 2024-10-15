const UserModel = require('../Models/user.js')
const bookmark=async(req,res)=>{
  try{
    const {email,id,explore,name,img,ratings,views}=req.body
    const user=await UserModel.findOne({email})
    const newData={
      id:id,
      explore:explore,
      name:name,
      img:img,
      ratings:ratings,
      views:views
    }
    user.bookmark.push(newData)
    user.save()
    return res.status(200).json({sucess:true,mark:user.bookmark})
  }catch(err){
    console.log(err)
  }

}

const getBookMark=async(req,res)=>{
  const {email}=req.params
  const user=await UserModel.findOne({email})
  return res.status(200).json({sucess:true,mark:user.bookmark})

}

const deleteBookMark = async (req, res) => {
  try {
    const { id, email } = req.body;

    // Validate input
    if (!id || !email) {
      return res.status(400).json({ success: false, message: 'ID and email are required' });
    }

    // Find the user by email
    const user = await UserModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.bookmark.pull({ id: id })

    console.log(user.bookmark)

    // Save the updated user document
    await user.save();

    // Return the updated bookmarks
    return res.status(200).json({ success: true, mark: user.bookmark });
  } catch (err) {
    console.error('Error deleting bookmark:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


module.exports={
  bookmark,
  getBookMark,
  deleteBookMark
}