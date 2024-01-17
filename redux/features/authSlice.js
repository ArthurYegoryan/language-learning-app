import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        isAuth: false,
        username: "",
        userid: "",
    }
};

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => {
            return initialState;
        },
        logIn: (state, action) => {
            console.log("Action payload:");
            console.log(JSON.stringify(action.payload));

            return {
                value: {
                    isAuth: true,
                    username: action.payload,
                },
            };
        },
        logInUserid: (state, action) => {
            console.log("Action payload:");
            console.log(JSON.stringify(action.payload));

            return {
                value: {
                    ...initialState.value,
                    userid: action.payload
                }
            };
        },
    },
});

export const { logIn, logInUserid, logOut } = auth.actions;
export default auth.reducer;