import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import userIcon from '../assets/user.png'
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { navigation } from '../constants/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {setLogedInUser,setisProfile,setisProfileLink} from "../app/store/moviesSlice"
// import { persistor } from '../app/store/store';
import { persistor } from '../main';



const Header = () => {
  const dispatch=useDispatch()
  const location = useLocation()
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const removeSpace = location?.search?.slice(3).split('%20').join(' ')
  const [searchInput, setSearchInput] = useState(removeSpace)
  const navigate = useNavigate()
  const loggedInuser=useSelector(state=>state.movieData.loggedInuser)
  const isProfile=useSelector(state=>state.movieData.isProfile)
  const isProfileLink=useSelector(state=>state.movieData.isProfileLink)
  console.log(isProfile)



  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('image')
    setSearchInput('')
    // dispatch(setLogedInUser(false))
    // setDropdownVisible(false)
    // dispatch(setisProfile(false))
    persistor.purge().then(() => {
      navigate('/'); 
      window.location.reload(false); 
    });
    
  }

  const handleLogInt=()=>{
    navigate('/login')
  }



  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`)
    }
    const isLoggedIn = localStorage.getItem('token') ? true : false;
    dispatch(setLogedInUser(isLoggedIn))
  }, [searchInput])



  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem('token') ? true : false;
  //   dispatch(setisProfile(isLoggedIn))
  //   if (isLoggedIn){
  //   dispatch(setisProfileLink(localStorage.getItem('image')))
  //   }

  // }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleDropDown = () => {
    setDropdownVisible(!isDropdownVisible)
  }

  return (
    <header className="fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75 z-40">
      <div className="container mx-auto px-4 flex items-center h-full gap-2">
        <Link to='/' onClick={() => searchInput('')}>
          <img src={logo} alt="logo" width={120} />
        </Link>

        {loggedInuser ? (
          <nav className='hidden lg:flex items-center gap-2 ml-5'>
            {navigation.map((nav, index) => (
              <div key={index}>
                <NavLink
                  to={nav.href}
                  className={({ isActive }) => `px-2 hover:text-neutral-100 ${isActive ? "text-neutral-200" : ""}`}
                  onClick={() => searchInput('')}
                >
                  {nav.label}
                </NavLink>
              </div>
            ))}
            <Link to={'/bookmark'} className='px-1 hover:text-neutral-100'>Watch Later</Link>
          </nav>
        ) : (
          <Link to={'/login'} className='px-1 hover:text-neutral-100'>Log In</Link>
        )}



        <div className='ml-auto flex items-center gap-4'>
          <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input type="text" placeholder='Search here...'
              className='bg-transparent px-4 py-1 hidden lg:block'
              onChange={e => setSearchInput(e.target.value)}
              value={searchInput} />
            <button className='text-2xl text-white'>
              <FaSearch />
            </button>
          </form>

          <div className='w-8 h-8 rounded-full overflow-hidde cursor-pointer   flex flex-col'>
            {isProfile?<img src={isProfileLink} alt="" width='w-ful h-ful'
              className='active:scale-50 transition-all' onClick={handleDropDown} />:
              <img src={userIcon} alt="" width='w-ful h-ful'
              className='active:scale-50 transition-all' onClick={handleDropDown} />}
            

            {isDropdownVisible && (
              <div className='absolute right-1 mt-10 w-24 bg-white border border-gray-300 rounded-md shadow-lg'>
                <ul className="py-1">
                  {loggedInuser?
                  <li className="px-4 py-1  hover:text-black cursor-pointer text-right" onClick={handleLogout}>Logout</li>:
                  <li className="px-4 py-1  hover:text-black cursor-pointer text-right" onClick={handleLogInt}>Login</li>}
                  
                </ul>


              </div>
            )}

          </div>


        </div>
      </div>
    </header>
  )

}

export default Header