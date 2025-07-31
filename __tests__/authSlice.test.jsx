import authReducer, { login, logout } from '../src/store/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

describe('authSlice', () => {
  beforeEach(() => fetchMock.resetMocks());

  it('logs in successfully', async () => {
    const user = { name: 'Luke Skywalker', birth_year: '19BBY' };
    fetchMock.mockResponseOnce(JSON.stringify({ results: [user] }));
    const store = configureStore({ reducer: { auth: authReducer } });
    await store.dispatch(login({ username: 'Luke', password: '19BBY' }));
    const state = store.getState().auth;
    expect(state.user).toEqual({ name: 'Luke Skywalker' });
    expect(state.status).toBe('succeeded');
  });

  it('fails invalid password', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ results: [{ name: 'Leia', birth_year: '19BBY' }] }));
    const store = configureStore({ reducer: { auth: authReducer } });
    await store.dispatch(login({ username: 'Leia', password: '20BBY' }));
    const state = store.getState().auth;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Invalid password');
  });

  it('resets on logout', () => {
    const nextState = authReducer({ user: { name: 'X' }, status: 'succeeded' }, logout());
    expect(nextState.user).toBeNull();
    expect(nextState.status).toBe('idle');
  });
});
