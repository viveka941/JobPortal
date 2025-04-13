import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setAllAdminJobs } from "../component/redux/jobSlice";

const UseGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          "http://localhost:8000/api/job/getadminjobs",
          {
            withCredentials: true,
          }
        );
        console.log("API Response:", res.data);
        if (res.data.status) {
          // Updated success check
          dispatch(setAllAdminJobs(res.data.jobs));
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);

  return { loading, error };
};

export default UseGetAllAdminJobs;
