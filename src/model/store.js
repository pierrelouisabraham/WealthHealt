import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice'; // Assurez-vous d'importer le slice que vous avez créé

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export default store;