import {createSlice} from '@reduxjs/toolkit'
import { act } from 'react';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'popularity', 
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    }
  }
})


export const {setCategoryId} = filterSlice.actions;

export default filterSlice.reducer;

