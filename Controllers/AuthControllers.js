const UserModel = require('../Models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const  uploadCloud  = require('../utils/cloudnary.js')
const signup = async (req, res) => {
  try {
    // console.log('Request Body:', req.body);
    // console.log('Request Files:', req.files);

    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }

    let imageLocation;
    let profile=''
    if (req.files && req.files.image && req.files.image.length > 0) {
      imageLocation = req.files.image[0].path; // Ensure image exists
      profile = await uploadCloud(imageLocation);
    } 
      

    const userModel = new UserModel({ name, email, password, image: profile?.url || '' });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    return res.status(201).json({ message: 'SignUp success', success: true, profile });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false
    });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    const errorMsg = 'Auth failed email or password is wrong'
    if (!user) {
      return res.status(403).json({ message: errorMsg, sucess: false })
    }
    const isPassEqual = await bcrypt.compare(password, user.password)
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, sucess: false })
    }
    const profile=user.image
    const jwtToken = jwt.sign({ email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    const name = user.name
    res.status(200).json({ message: 'Login sucesss', sucess: true, jwtToken, email, password, name,profile })
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      sucess: false
    })

  }

}


module.exports = {
  signup,
  login
}