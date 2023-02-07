import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: false,
  config: {},
  slug: ''
};

export const getConfigFile = createAsyncThunk(
  'config/getConfigFile',
  async () => {
    const response = await fetch('/config.json');
    return await response.json();
  }
);

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: {
    [getConfigFile.pending]: (state) => {
      state.loading = true;
    },
    [getConfigFile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      // window is only undefined when SRR in dev
      const host = typeof window === 'undefined' ? 'localhost:3000' : document.location.host;
      const env = payload.configHostMap[host];
      state.config = payload.config[env] || payload.config['conns-dev'];
      state.slug = state.config.slug;
    },
    [getConfigFile.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default configSlice.reducer;
