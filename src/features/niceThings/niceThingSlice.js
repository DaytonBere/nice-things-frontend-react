import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import niceThingService from "./niceThingService";

const initialState = {
    users: [],
    niceThings: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getUsers = createAsyncThunk(
    "niceThings/getAll",
    async (_, thunkAPI) => {
        try {
            return await niceThingService.getUsers();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createNiceThing = createAsyncThunk(
    "niceThings/create",
    async (niceThingData, thunkAPI) => {
        try {
            return await niceThingService.createNiceThing(niceThingData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getUserNiceThings = createAsyncThunk(
    "niceThings/getUserNiceThings",
    async (userData, thunkAPI) => {
        try {
            return await niceThingService.getUserNiceThings(userData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const niceThingSlice = createSlice({
    name: "niceThing",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNiceThing.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNiceThing.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.niceThings = action.payload;
            })
            .addCase(createNiceThing.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserNiceThings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserNiceThings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.niceThings = action.payload;
            })
            .addCase(getUserNiceThings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = niceThingSlice.actions;
export default niceThingSlice.reducer;
