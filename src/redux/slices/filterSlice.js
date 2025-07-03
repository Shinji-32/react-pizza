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
  reducers: { // в reducers передаємо об'єкти
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action){
      state.sort = action.payload;
    }
  }

})

//витягуємо actions(тобто конкретні властивості методу)
export const {setCategoryId, setSort} = filterSlice.actions;
//за замовчування експортуємо редюсер
export default filterSlice.reducer;

