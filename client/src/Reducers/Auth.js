import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuth:false,
    user:null
}

export const Auth = createSlice({
    name:'Auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isAuth = true
            state.user = action.payload;
        },
        logout:(state)=>{
            state.isAuth = false
            state.user = null
        }
    }
})

export const {login,logout} = Auth.actions;
