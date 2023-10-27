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
        error:""
    },
    reducers:{
        search:(state,payload)=>{
            // if(payload){
            //     state.restuarants = payload
                
            // }else{
            //     return state.restuarants
            // }
           
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchRestuarants.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchRestuarants.fulfilled, (state,action)=>{
            state.loading = false
            state.restuarants = action.payload
            state.error=''
        })
        builder.addCase(fetchRestuarants.rejected, (state,action)=>{
            state.loading = false
            state.restuarants = []
            state.error=action.error.message
        })
    }
})
export const {search} = restuarantSlice.actions
export default restuarantSlice.reducer