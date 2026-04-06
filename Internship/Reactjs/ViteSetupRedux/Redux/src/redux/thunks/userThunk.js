import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginThunk = createAsyncThunk(
    "login",
    async({data,token,param},{rejectWithValue})=>{
try {
    const resp = await axios.post("",payl)
    return resp.data;
} catch (error) {
    return rejectWithValue(error.response.data)
}
    }
)