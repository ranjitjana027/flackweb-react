import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

type UserData = {
    user_id: string,
    display_name: string
};

export const autoSignin = createAsyncThunk(
    'auth/autoSignin',
    async () => {
        const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/profile`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('flackwebToken')}`
            }
        });
        const data: { success: boolean, user: UserData } = await response.json();
        if (data.success) {
            return {
                user: data.user,
                status: "Signed in successfully"
            };
        } else {
            return {
                user: false,
                status: false
            };
        }
    }
)

export const signin = createAsyncThunk(
    'auth/signin',
    async (arg: { username: string, password: string, remember: boolean }, thunkAPI) => {
        localStorage.setItem('flackwebRememberUsername', `${arg.remember}`);
        const fd = new FormData();
        fd.append("username", arg.username);
        fd.append("password", arg.password);
        const payload = {
            username: arg.username,
            password: arg.password
        }
        const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/auth/login`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data: { success: boolean, user: UserData, access_token: string } = await response.json();
        if (data.success) {
            localStorage.setItem('flackwebToken', data.access_token);
            localStorage.setItem('flackwebUsername', arg.username);
            return {
                user: data.user,
                status: "Signed in successfully"
            };
        } else {
            return {
                user: false,
                status: "username and password didn't match"
            }
        }
    }
)

export const signout = createAsyncThunk(
    'auth/signout',
    async (arg, thunkAPI) => {
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

const pending = (state: AuthState) => {
    state.isLoading = true;
    state.hasError = false;
}

const rejected = (state: AuthState) => {
    state.isLoading = false;
    state.hasError = true;
}

type AuthState = {
    user: boolean | {
        user_id: string,
        display_name: string
    },
    status: boolean | string,
    isLoading: boolean,
    hasError: boolean
}

const initialState: AuthState = {
    user: false,
    status: false,
    isLoading: false,
    hasError: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signin.pending, pending);
        builder.addCase(signin.rejected, rejected);
        builder.addCase(signin.fulfilled, (state: AuthState, action: PayloadAction<{ user: boolean | UserData, status: boolean | string }>) => {
            state.user = action.payload.user;
            state.status = action.payload.status;
            state.isLoading = false;
            state.hasError = false;
        });
        builder.addCase(autoSignin.pending, pending);
        builder.addCase(autoSignin.rejected, rejected);
        builder.addCase(autoSignin.fulfilled, (state: AuthState, action: PayloadAction<{ status: boolean | string, user: boolean | UserData }>) => {
            state.user = action.payload.user;
            state.status = action.payload.status;
            state.isLoading = false;
            state.hasError = false;
        });
        builder.addCase(signout.pending, pending);
        builder.addCase(signout.rejected, rejected);
        builder.addCase(signout.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = false;
                state.status = false;
            }
            state.isLoading = false;
            state.hasError = false;
        });
    },
})

export default authSlice.reducer;
