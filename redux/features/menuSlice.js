import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isMenuOpen: true,
};

export const menu = createSlice({
    name: "menu",
    initialState,
    reducers: {
        editMenuStatusFalse: () => {
            return {
                isMenuOpen: false,
            };
        },
        editMenuStatusTrue: () => {
            return {
                isMenuOpen: true,
            };
        },
    },
});

export const { editMenuStatusFalse, editMenuStatusTrue } = menu.actions;
export default menu.reducer;