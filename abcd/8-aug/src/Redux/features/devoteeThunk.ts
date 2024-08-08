import { createAsyncThunk } from "@reduxjs/toolkit";

export const getpayments = createAsyncThunk(
  "fetchPayments",
  async (kuchb, { rejectWithValue }) => {
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/devotee/mypayments`
        );
        const json = await response.json();
        return json.payments
    } catch (error : any) {
       return rejectWithValue(error.message);
    }
  }
);