import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchallUsers = createAsyncThunk(
  "fetchAlluserlist",
  async(kuchb ,{rejectWithValue}) => {
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/alluserlist`
        );
        const json = await response.json();
        if(!response.ok){
          throw new Error(json);
        }
        return json;
    } catch (error : any) {
      rejectWithValue(error.message)
    }
  }
)

export const fetchUsers = createAsyncThunk(
  "fetchuserlist",
  async ({pageNumber,pageSize}:{pageNumber : number,pageSize : number}, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/userlist?pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json);
      }
      return json;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
);


export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/${userId}`,
        { method: "DELETE" }
      );
      if (!response.status.toString().includes("2")) {
        const { message } = await response.json();
        throw new Error(message);
      }
      const json = await response.json();
      return json;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
);
