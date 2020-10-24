import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStateType } from '../../../types/state.types';

const initialState: UserStateType = {} as UserStateType;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserStateType>) => {
      Object.assign(state, { ...action.payload });
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
