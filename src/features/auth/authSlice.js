import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signin= createAsyncThunk(
    'auth/signin',
    async (arg, thunkAPI) => {
        let response;
        if(arg){
            const fd=new FormData();
            fd.append("username",arg.username);
            fd.append("password", arg.password);
            response = await fetch('/api/login',{
                method:'POST',
                body:fd
            });
        }
        else{
            response=await fetch('/api/login');
        }
        
        const data= await response.json();
        if(data.success){
            return {
                user: data.user,
                status: "Signed in successfully"
            };
        }
        else{
            if(arg){
                return {
                    user: false,
                    status: "username and password didn't match"
                }
            }
            else{
                return {
                    user: false,
                    status: false
                }
            }
            
        }
    }
)

export const signout =createAsyncThunk(
    'auth/signout',
    async (arg, thunkAPI) =>{
        const response= await fetch('/api/logout',{
            method:'POST'
        });
        const data = await response.json();
        if(data.success){
            return true;
        }
    }
)

const pending = state => {
    state.isLoading=true;
    state.hasError= false;
}

const rejected = state => {
    state.isLoading=false;
    state.hasError=true;
}

export const authSlice = createSlice({
    name:'auth',
    initialState:{
        user: false,
        status:false,
        isLoading: false,
        hasError: false
    },
    reducers:{},
    extraReducers: {
        [signin.pending] : pending,
        [signin.rejected] : rejected,
        [signin.fulfilled] : ( state, action ) => {
            state.user=action.payload.user;
            state.status=action.payload.status;
            state.isLoading=false;
            state.hasError=false;
        },
        [signout.pending] : pending,
        [signout.rejected] : rejected,
        [signout.fulfilled] : (state, action) =>{
            if(action.payload){
                state.user=false;
                state.status=false;
            }
            state.isLoading=false;
            state.hasError=false;
        }
    }
})

export default authSlice.reducer;