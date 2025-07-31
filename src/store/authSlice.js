import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPeople } from '../../api/ApiHelper';

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const person = await fetchPeople(username);
            if (!person) return rejectWithValue('User not found');
            if (person.birth_year !== password) {
                return rejectWithValue('Invalid password');
            }
            return { name: person.name };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, status: 'idle', error: null },
    reducers: {
        logout(state) {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
