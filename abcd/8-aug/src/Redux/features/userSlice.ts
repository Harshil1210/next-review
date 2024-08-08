import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/Models/userModel";
import { deleteUser, fetchUsers, fetchallUsers } from "./userThunk";

interface IUserSlice {
  loggedInUser: IUser | null;
  userlist: IUser[];
  edituser: IUser | null;
  error: string | null;
  loading: boolean;
  alluserlist: IUser[] | null;
}

const initialState: IUserSlice = {
  alluserlist: null,
  loggedInUser: null,
  userlist: [],
  edituser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addEdituser: (state, action) => {
      return { ...state, edituser: action.payload };
    },
    removeEdituser: (state, action) => {
      return { ...state, edituser: null };
    },
    addLoggedInuser: (state, action) => {
      return { ...state, loggedInUser: action.payload };
    },
    removeLoggedInuser: (state, action) => {
      return { ...state, loggedInUser: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchallUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.alluserlist = action.payload;
    });
    builder.addCase(fetchallUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });
    builder.addCase(fetchallUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.userlist = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userlist = state.userlist.filter(
        (user) => user._id !== action.payload.deletedUser._id
      );
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const {
  addEdituser,
  removeEdituser,
  addLoggedInuser,
  removeLoggedInuser,
} = userSlice.actions;
export default userSlice.reducer;
