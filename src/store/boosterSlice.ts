import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Booster, BoosterResponse } from "../types/types";

interface InitialState {
  boostersCollection: Booster[];
  boostersIndex?: string,
  filter: string;
}

const initialState: InitialState = { boostersCollection: [], filter: "" };

const boostersSlice = createSlice({
                                    name: "boosters",
                                    initialState,
                                    reducers: {
                                      updateBoosters: (state, action: PayloadAction<BoosterResponse[]>) => {
                                        state.boostersCollection = action.payload[0].boosters;
                                        state.boostersIndex = action.payload[0].id;
                                      },
                                      addBooster: (state, action: PayloadAction<Booster>) => {
                                        state.boostersCollection.push(action.payload);
                                      },
                                      deleteBooster: (state, action: PayloadAction<string>) => {
                                        state.boostersCollection = state.boostersCollection.filter(
                                          (booster) => booster.name !== action.payload
                                        );
                                      },
                                      filterBoosters: (state, action: PayloadAction<string>) => {
                                        state.filter = action.payload;
                                      },
                                    },
                                  });

export const { updateBoosters, addBooster, deleteBooster, filterBoosters } = boostersSlice.actions;

export default boostersSlice.reducer;
