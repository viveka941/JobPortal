import React, { useState, useEffect } from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading && allJobs?.length > 0) {
      setLoading(false);
    }
  }, [allJobs, loading]); 

  return (
    <></>
  )
};

export default LatestJobs;
