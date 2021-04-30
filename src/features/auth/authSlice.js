import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const autoSignin= createAsyncThunk(
  'auth/autoSignin',
  async () =>{
    const response=await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/auth`,{
      headers:{
        'Access-Control-Allow-Origin':'*',
        'x-access-tokens': localStorage.getItem('flackwebToken')
      }
    });
    const data= await response.json();
    if(data.success){
      return {
          user: data.user,
          status: "Signed in successfully"
      };
    }
    else{
      return {
          user: false,
          status: false
      };
    }
  }
)

export const signin= createAsyncThunk(
    'auth/signin',
    async (arg, thunkAPI) => {
          const fd=new FormData();
          fd.append("username",arg.username);
          fd.append("password", arg.password);
          const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/login`,{
              method:'POST',
              headers:{
                'Access-Control-Allow-Origin':'*'
              },
              body:fd
          });
        const data= await response.json();
        if(data.success){
          localStorage.setItem('flackwebToken',data.token);
            return {
                user: data.user,
                status: "Signed in successfully"
            };
        }
        else{
              return {
                  user: false,
                  status: "username and password didn't match"
              }
        }
    }
)

export const signout =createAsyncThunk(
    'auth/signout',
    async (arg, thunkAPI) =>{
        // const response= await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/logout`,{
        //     method:'POST'
        // });
        // const data = await response.json();
        // if(data.success){
        //     return true;
        // }
        localStorage.removeItem('flackwebToken');
        return true;
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
        [autoSignin.pending] : pending,
        [autoSignin.rejected] : rejected,
        [autoSignin.fulfilled] : ( state, action ) => {
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
