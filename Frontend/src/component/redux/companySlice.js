import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null, // Fixed typo
  },
  reducers: {
    setSingleCompany: (state, action) => {
      // Fixed typo
      state.singleCompany = action.payload;
    },
  },
});

export const { setSingleCompany } = companySlice.actions; // Fixed typo
export default companySlice.reducer;
