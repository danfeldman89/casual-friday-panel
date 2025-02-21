import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../types/types";

interface InitialState {
  rolesCollection: Role[];
  filter: string;
}

const initialState: InitialState = { rolesCollection: [], filter: "" };

const roleSlice = createSlice({
                                name: "roles",
                                initialState,
                                reducers: {
                                  updateRoles: (state, action: PayloadAction<Role[]>) => {
                                    state.rolesCollection = action.payload;
                                  },
                                  addRole: (state, action: PayloadAction<Role>) => {
                                    state.rolesCollection.push(action.payload);
                                  },
                                  deleteRole: (state, action: PayloadAction<string>) => {
                                    state.rolesCollection = state.rolesCollection.filter(
                                      (role) => role.id !== action.payload
                                    );
                                  },
                                  filterRoles: (state, action: PayloadAction<string>) => {
                                    state.filter = action.payload;
                                  },
                                },
                              });

export const { updateRoles, addRole, deleteRole, filterRoles } = roleSlice.actions;
export default roleSlice.reducer;
