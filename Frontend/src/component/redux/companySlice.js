import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null, // Fixed typo
    companies:[],
  },
  reducers: {
    setSingleCompany: (state, action) => {
      // Fixed typo
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
  },
});

export const { setSingleCompany, setCompanies } = companySlice.actions; // Fixed typo
export default companySlice.reducer;
