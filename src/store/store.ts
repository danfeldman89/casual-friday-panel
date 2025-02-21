import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice.ts";
import rolesReducer from "./roleSlice.ts";
import permissionsReducer from "./permissionSlice.ts";

const store = configureStore({
                               reducer: {
                                 users: usersReducer,
                                 roles: rolesReducer,
                                 permissions: permissionsReducer
                               },
                             });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
