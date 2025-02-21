import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Permission } from "../types/types.tsx";

interface InitialState {
  permissionsCollection: Permission[];
  filter: string;
}

const initialState: InitialState = { permissionsCollection: [], filter: "" };

const permissionsSlice = createSlice({
                                       name: "permissions",
                                       initialState,
                                       reducers: {
                                         updatePermissions: (state, action: PayloadAction<Permission[]>) => {
                                           state.permissionsCollection = action.payload;
                                         },
                                         addPermission: (state, action: PayloadAction<Permission>) => {
                                           state.permissionsCollection.push(action.payload);
                                         },
                                         deletePermission: (state, action: PayloadAction<string>) => {
                                           state.permissionsCollection = state.permissionsCollection.filter(
                                             (permission) => permission.id !== action.payload
                                           );
                                         },
                                         filterPermissions: (state, action: PayloadAction<string>) => {
                                           state.filter = action.payload;
                                         },
                                       },
                                     });

export const { addPermission, deletePermission, filterPermissions, updatePermissions } = permissionsSlice.actions;

export default permissionsSlice.reducer;
