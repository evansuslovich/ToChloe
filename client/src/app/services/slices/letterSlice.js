import { createSlice } from '@reduxjs/toolkit';

const lettersSlice = createSlice({
  name: 'letters',
  initialState: {},
  reducers: {
  },
});

export const { setLetter, setLetters } = lettersSlice.actions;


export default lettersSlice.reducer;