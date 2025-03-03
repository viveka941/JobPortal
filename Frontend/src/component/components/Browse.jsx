import React, { useEffect } from "react";
import Navbar from "../Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import UserGetAllJobs from "../../hook/UserGetAllJobs";


export default function Browse() {
  UserGetAllJobs();
  const {allJobs}= useSelector((store)=>store.job )
  const dispatch = useDispatch()
  useEffect(()=>{
    return ()=>{
      dispatch(setSearchQuery(""))
    }
  },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="text-lg font-semibold mb-4">
          Search Results: {allJobs.length}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {allJobs.map((item, index) => (
            <Job key={index} job={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
