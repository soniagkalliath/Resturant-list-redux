import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRestuarants = createAsyncThunk('restuarantList/fetchRestuarants',()=>{
    return axios.get('/restaurants.json').then(result=>result.data.restaurants)
})

const restuarantSlice = createSlice({
    name:'restuarantList',
    initialState:{
        loading:false,
        restuarants:[],
        restContainer:[],
        error:"",
        restPerPage:6,
        currentPage:1
    },
    reducers:{
        search:(state,action)=>{
           state.restuarants = state.restContainer.filter(item=>item.neighborhood.toLowerCase().includes(action.payload))  
        },
        onNavigateNext:(state)=>{
            state.currentPage++
        },
        onNavigatePrev:(state)=>{
            state.currentPage--
        },
        // onChangeRestPerPage:(state,action)=>{
        //     state.restPerPage = action.payload
        // },
        // onClickRestPerPage:(state,action)=>{
        //     state.currentPage = action.payload
        // }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchRestuarants.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchRestuarants.fulfilled, (state,action)=>{
            state.loading = false
            state.restuarants = action.payload
            state.restContainer = action.payload
            state.error=''
        })
        builder.addCase(fetchRestuarants.rejected, (state,action)=>{
            state.loading = false
            state.restuarants = []
            state.error=action.error.message
        })
    }
})
export const {search,onNavigateNext,onNavigatePrev} = restuarantSlice.actions
export default restuarantSlice.reducer