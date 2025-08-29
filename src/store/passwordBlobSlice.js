// src/store/passwordBlobSlice.js
import {
    configureStore
    ,createSlice
    ,combineReducers

} from '@reduxjs/toolkit';


const initialState = {
    passwordBlob: '',
};

const passwordBlobSlice = createSlice({
    name: 'passwordBlob',
    initialState,
    reducers: {
        setPasswordBlob: (state, action) => {
            state.passwordBlob = action.payload;
        },
        setPasswordBlobInitialState: (state) => {
            state.passwordBlob = '';
        },
    },
});

const reducers = combineReducers({
    passwordBlob: passwordBlobSlice.reducer,
});    

export const store = configureStore({
    reducer: reducers,
});

export const AppDispatch = store.dispatch;




export const { setPasswordBlob, setPasswordBlobInitialState } = passwordBlobSlice.actions;
export default passwordBlobSlice.reducer;