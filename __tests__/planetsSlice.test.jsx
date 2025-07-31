import planetsReducer, { loadPlanets, setQuery } from '../src/store/planetsSlice';
import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

describe('planetsSlice', () => {
  beforeEach(() => fetchMock.resetMocks());

  it('sets query and clears list', () => {
    const state = planetsReducer(
      { list: [1], next: 'x', query: '', status: 'succeeded' },
      setQuery('abc')
    );
    expect(state.query).toBe('abc');
    expect(state.list).toEqual([]);
    expect(state.next).toBeNull();
  });

  it('loads a page', async () => {
    const page = { results: [{ name: 'Tatooine', population: '200000' }], next: null };
    fetchMock.mockResponseOnce(JSON.stringify(page));
    const store = configureStore({ reducer: { planets: planetsReducer } });
    await store.dispatch(loadPlanets({ query: 'tatooine' }));
    const state = store.getState().planets;
    expect(state.list).toHaveLength(1);
    expect(state.list[0].name).toBe('Tatooine');
  });
});
