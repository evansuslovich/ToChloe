import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, isLoggedIn: false},
  reducers: {
    setUser: (state, { payload }) => ({
      ...state,
      user: payload,
      isLoggedIn: Boolean(payload),
    })
  },
});

export const { setUser } = slice.actions;


export default slice.reducer;