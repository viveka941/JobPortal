import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applications: [], // Stores multiple applicants
    singleApplication: null,
    searchApplicationByText: "",
  },
  reducers: {
    setApplicants(state, action) {
      state.applications = action.payload; // ✅ Store all applicants
    },
    setSingleApplication(state, action) {
      state.singleApplication = action.payload;
    },
    setSearchApplicationByText(state, action) {
      state.searchApplicationByText = action.payload;
    },
  },
});

export const {
  setApplicants,
  setSingleApplication,
  setSearchApplicationByText,
} = applicationSlice.actions;

export default applicationSlice.reducer;
