import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const mBar = 'mBar';
export const inHg = 'inHg';

export type PressureType = typeof mBar | typeof inHg;

export interface PressureReducerType {
  type: PressureType;
}

const initialState: PressureReducerType = {
  type: mBar,
};

const pressureSlice = createSlice({
  initialState: initialState,
  name: 'pressure',
  reducers: {
    setPressureType(
      state: PressureReducerType,
      action: PayloadAction<PressureType>,
    ) {
      state.type = action.payload;
    },
  },
});

export default pressureSlice.reducer;
export const {setPressureType} = pressureSlice.actions;
