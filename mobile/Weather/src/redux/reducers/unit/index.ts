import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const UNIT_METRIC = 'metric';
export const UNIT_IMPERIAL = 'imperial';

export type UnitType = typeof UNIT_METRIC | typeof UNIT_IMPERIAL;

export interface UnitReducerType {
  type: UnitType;
}

const initialState: UnitReducerType = {
  type: UNIT_METRIC,
};

const unitSlice = createSlice({
  initialState: initialState,
  name: 'unit',
  reducers: {
    setUnitType(state: UnitReducerType, action: PayloadAction<UnitType>) {
      state.type = action.payload;
    },
  },
});

export default unitSlice.reducer;
export const {setUnitType} = unitSlice.actions;
