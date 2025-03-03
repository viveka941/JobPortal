import { createSlice } from "@reduxjs/toolkit";
import { all } from "axios";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob(state, action) {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      console.log("Updating Redux State:", action.payload);
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
} = jobSlice.actions;
export default jobSlice.reducer;
