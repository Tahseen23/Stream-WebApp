import { createSlice } from "@reduxjs/toolkit";

const initialState={
  bannerData:[],
  imageURL:"",
  watchLater:[],
  loggedInuser:false,
  isProfile:false,
  isProfileLink:null,
  email:''

}

export const moviesSlice=createSlice({
  name:'movies',
  initialState,
  reducers:{
    setBannerData:(state,action)=>{
      state.bannerData=action.payload
    },
    setImageURL:(state,action)=>{
      state.imageURL=action.payload
    },
    // setWatchLater:(state, action) => {
    //   const existingItem = state.watchLater.find(item => item.id === action.payload.id);
    //   if (existingItem) {
    //     // If the item exists, remove it
    //     state.watchLater = state.watchLater.filter(item => item.id !== action.payload.id);
    //   } else {
    //     // If the item doesn't exist, add it
    //     state.watchLater = [...state.watchLater, action.payload];
    //   }
    // },
    setWatchLater:(state,action)=>{
      state.watchLater=action.payload
    },
    setLogedInUser:(state,action)=>{
      state.loggedInuser=action.payload
    },
    setisProfile:(state,action)=>{
      state.isProfile=action.payload
    },
    setisProfileLink:(state,action)=>{
      state.isProfileLink=action.payload
    },
    setemail:(state,action)=>{
      state.email=action.payload
    }

  }
})

export const {setBannerData,setImageURL,setWatchLater,setLogedInUser,setisProfile,setisProfileLink,setemail}=moviesSlice.actions

export default moviesSlice.reducer