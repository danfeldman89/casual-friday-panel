import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserAuth } from "../types/types.tsx";

interface InitialState {
  usersCollection: User[];
  filter: string;
  currentUser?: UserAuth;
}

const initialState: InitialState = { usersCollection: [], filter: "" };

const userSlice = createSlice({
                                name: "users",
                                initialState,
                                reducers: {
                                  updateUsers: (state, action: PayloadAction<User[]>) => {
                                    state.usersCollection = action.payload;
                                  },
                                  updateCurrentUserAuth: (state, action: PayloadAction<UserAuth>) => {
                                    state.currentUser = action.payload;
                                  },
                                  addUser: (state, action: PayloadAction<User>) => {
                                    state.usersCollection.push(action.payload);
                                  },
                                  deleteUser: (state, action: PayloadAction<string>) => {
                                    state.usersCollection = state.usersCollection.filter((user) => user.id !== action.payload);
                                  },
                                  filterUsers: (state, action: PayloadAction<string>) => {
                                    state.filter = action.payload;
                                  }
                                }
                              });

export const { addUser, deleteUser, filterUsers, updateUsers, updateCurrentUserAuth } = userSlice.actions;
export default userSlice.reducer;
