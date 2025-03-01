import { createSlice } from "@reduxjs/toolkit";

const initialState={
  allJobs:[],
  singleJob:null,
}

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob(state,action){
      state.singleJob=action.payload
    }
  },
});

export const { setAllJobs,setSingleJob } = jobSlice.actions;
export default jobSlice.reducer;
