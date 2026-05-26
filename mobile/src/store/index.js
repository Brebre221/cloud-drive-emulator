import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    recent: [],
    favorites: [],
    library: [],
  },
  reducers: {
    addRecent: (state, action) => {
      const game = action.payload;
      state.recent = [
        game,
        ...state.recent.filter(g => g.id !== game.id),
      ].slice(0, 10);
    },
    addFavorite: (state, action) => {
      const game = action.payload;
      if (!state.favorites.find(g => g.id === game.id)) {
        state.favorites.push(game);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(g => g.id !== action.payload);
    },
  },
});

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    games: gamesSlice.reducer,
  },
});

export const { setUser, logout } = authSlice.actions;
export const { addRecent, addFavorite, removeFavorite } = gamesSlice.actions;
