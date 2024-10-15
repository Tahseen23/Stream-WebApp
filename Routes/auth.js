const { signup, login } = require('../Controllers/AuthControllers')
const { bookmark,getBookMark, deleteBookMark } = require('../Controllers/bookmark.js')
const upload  = require('../Middlewares/multer.js')
const { signupValidation,loginValidation } = require('../Middlewares/validation')



const router=require('express').Router()

router.post('/login',loginValidation,login)


router.route('/signup').post(
  upload.fields([
    {
        name: "image",
        maxCount: 1
    }
]),
  signupValidation,
  signup
);

router.route('/bookmark').put(bookmark)
router.route('/bookmark/:email').get(getBookMark)
router.route('/bookmark').delete(deleteBookMark)



module.exports=router