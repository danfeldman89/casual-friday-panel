import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

export const useCurrentUser = () => {
  const currentUser = useSelector((state: RootState) => state.users.currentUser);
  return currentUser ?? JSON.parse(localStorage.getItem("currentUser") || "null");
};
