import { Link, useNavigate } from "react-router-dom"
import logo from '../assets/logo.png'
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp=()=>{

  const [signupInfo,setSignupInfo] = useState({
    name:'',
    email: '',
    password: '',
    image:null
  })
  const navigate=useNavigate()

  const [showPass, setShowPass] = useState(false)
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setSignupInfo({ ...signupInfo, [name]: files[0] });
    } else {
      setSignupInfo({ ...signupInfo, [name]: value });
    };
  }

  const eyeToggle = () => {
    setShowPass(!showPass)

  }

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    const { name, email, password, image } = signupInfo; // Destructure the signup info
  
    console.log(name, email, password, image); // Log the information for debugging
  
    try {
      const url = 'http://localhost:8080/auth/signup'; // Your API endpoint
      const formData = new FormData(); // Create a new FormData object
  
      // Append the data to the FormData object
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      if (signupInfo.image) {
        formData.append('image', signupInfo.image); // Append the image file
      }
  
      const response = await fetch(url, {
        method: 'POST',
        body: formData, // Send the FormData object
      });
  
      const result = await response.json(); // Parse the JSON response
      const { success, message } = result; // Destructure the response
  
      if (success) {
        navigate('/login'); // Navigate to login on success
      } else {
        console.error(message); // Handle any errors
      }
    } catch (err) {
      console.log(err); // Log any caught errors
    }
  };
  

  return (
    <div>
      <div className="p-2">
        <Link to='/' onClick={() => searchInput('')}>
          <img src={logo} alt="logo" width={120} />
        </Link>

        <div className="flex flex-col gap-3 items-center">
          <div className='capitalize text-lg font-extrabold my-3 align-middle text-center mt-20'>
            <h1>SignIn</h1>
          </div>

          <form onSubmit={handleSignup}>

          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="name" name="name" placeholder="Enter your name..." onChange={handleChange} value={signupInfo.name} />
            <br />

            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" name="email" placeholder="Enter your email..." onChange={handleChange} value={signupInfo.email} />
            <br />

            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <div className="flex">

              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type={showPass ? "text" : "password"} name="password" placeholder="Enter your password" onChange={handleChange} value={signupInfo.password} />

              <div className="-ml-5 mt-3 cursor-pointer" onClick={eyeToggle}>
                {showPass ?
                  <FaEye></FaEye> :
                  <FaEyeSlash />
                }
              </div>

            </div>
            <br />

            <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Image</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer" type="file" name="image" placeholder="Enter your email..." onChange={handleChange}  />

            <br />

            
            <div className="flex flex-col items-center">
            <button className="bg-red-700 rounded p-2 hover:text-neutral-500" type="submit">SignIn</button>
              <p className="mt-2">Already! have an account ?
              <Link to="/login" className="hover:text-blue-700">login</Link>
              </p>
            </div>


          </form>

        </div>
      </div>

    </div>
  )
}

export default SignUp