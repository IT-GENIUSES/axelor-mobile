import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchCompany} from '@/modules/auth/api/company-api';

export const fetchCompanies = createAsyncThunk(
  'company/fetchCompany',
  async function () {
    return searchCompany().then(response => response.data.data);
  },
);

const initialState = {
  loading: false,
  companyList: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchCompanies.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      state.loading = false;
      state.companyList = action.payload;
    });
  },
});

export const companyReducer = companySlice.reducer;