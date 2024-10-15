import { Link, useNavigate } from "react-router-dom"
import logo from '../assets/logo.png'
import { useState, useEffect } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setisProfile, setisProfileLink, setemail,setWatchLater } from "../app/store/moviesSlice"



const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const watchLater = useSelector(state => state.movieData.watchLater)


  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })


  const [showPass, setShowPass] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target
    const copyLogInInfo = { ...loginInfo };
    copyLogInInfo[name] = value;
    setLoginInfo(copyLogInInfo);
  }

  const eyeToggle = () => {
    setShowPass(!showPass)

  }



  const handlleLogin = async (e) => {
    e.preventDefault()
    const url = 'http://localhost:8080/auth/login'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    })
    const result = await response.json()
    const { sucess, message, jwtToken, name, profile, email } = result

    if (profile) {
      dispatch(setisProfile(true))
      dispatch(setisProfileLink(profile))

    }
    if (sucess) {
      dispatch(setemail(email))
      getBookMark(email)
      localStorage.setItem('token', jwtToken)
      localStorage.setItem('loggedInUser', name)
      navigate('/')
    }
  }

   async function getBookMark(email) {
    try {
      console.log(email)
      const url = `http://localhost:8080/auth/bookmark/${encodeURIComponent(email)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorDetails = await response.text(); 
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorDetails}`);
      }

      const result = await response.json();
      const {  mark } = result;
      dispatch(setWatchLater(mark));
         
      
    } catch (error) {
      console.error('Error fetching bookmarks:', error.message); 
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
            <h1>LogIn</h1>
          </div>

          <form onSubmit={handlleLogin}>

            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" name="email" placeholder="Enter your email..." onChange={handleChange} value={loginInfo.email} />
            <br />

            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <div className="flex">

              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type={showPass ? "text" : "password"} name="password" placeholder="Enter your password" onChange={handleChange} value={loginInfo.password} />

              <div className="-ml-5 mt-3 cursor-pointer" onClick={eyeToggle}>
                {showPass ?
                  <FaEye></FaEye> :
                  <FaEyeSlash />
                }
              </div>

            </div>
            <br />


            <div className="flex flex-col items-center">
              <button className="bg-red-700 rounded p-2 hover:text-neutral-500" type="submit">Login</button>
              <p className="mt-2">Don't have an account ?
                <Link to="/signup" className="hover:text-blue-700">signUp</Link>
              </p>
            </div>


          </form>

        </div>
      </div>

    </div>
  )
}

export default Login