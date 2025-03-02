import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null, // Fixed typo
    companies: [],
    searchCompaniesByText: "",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      // Fixed typo
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    searchCompaniesByText:(state,action)=>{
      state.searchCompaniesByText = action.payload;
    }
  },
});

export const { setSingleCompany, setCompanies, searchCompaniesByText } =
  companySlice.actions; // Fixed typo
export default companySlice.reducer;
