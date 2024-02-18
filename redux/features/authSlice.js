import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        isAuth: false,
        username: "",
        userid: "",
        role: "",
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
                    ...state.value,
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
                    ...state.value,
                    userid: action.payload
                }
            };
        },
        logInUserRole: (state, action) => {
            console.log("Action payload:");
            console.log(JSON.stringify(action.payload));

            return {
                value: {
                    ...state.value,
                    role: action.payload
                }
            };
        }
    },
});

export const { logIn, logInUserid, logOut, logInUserRole } = auth.actions;
export default auth.reducer;