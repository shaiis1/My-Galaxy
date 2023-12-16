import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import peopleSlice from './slices/peopleSlice';
import planetsSlice from './slices/planetsSlice';

export const store = configureStore({
  reducer: {
      planets: planetsSlice,
      people: peopleSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
