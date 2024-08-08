import { Ipayments } from "@/app/devotee/mypayments/page";
import { createSlice } from "@reduxjs/toolkit";
import { getpayments } from "./devoteeThunk";

interface IDevoteeSlice {
  payments: Ipayments[];
  loading: boolean;
  error: string;
}

const initialState: IDevoteeSlice = {
  payments: [],
  loading: false,
  error: "",
};

const DevoteeSlice = createSlice({
  name: "devotee",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getpayments.fulfilled, (state, action) => {
      state.loading = false;
      state.payments = action.payload;
    });
    builder.addCase(getpayments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getpayments.rejected, (state, action) => {
      state.error = String(action.payload);
    });
  },
});

export default DevoteeSlice.reducer;
