import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPlanetsPage } from '../../api/ApiHelper';

export const loadPlanets = createAsyncThunk(
    'planets/load',
    async ({ query, nextUrl }, { rejectWithValue }) => {
        try {
            const page = await fetchPlanetsPage(nextUrl || query);
            return page;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const planetsSlice = createSlice({
    name: 'planets',
    initialState: {
        list: [],
        next: null,
        status: 'idle',
        error: null,
        query: ''
    },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
            state.list = [];
            state.next = null;
            state.status = 'idle';
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadPlanets.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadPlanets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = [
                    ...state.list,
                    ...action.payload.results
                ];
                console.log('action.payload.results::: ', action.payload.results);
                state.next = action.payload.next;
            })
            .addCase(loadPlanets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { setQuery } = planetsSlice.actions;
export default planetsSlice.reducer;
