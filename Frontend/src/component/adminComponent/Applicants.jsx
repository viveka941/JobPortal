import React, { useEffect } from "react";
import Navbar from "../Navbar";
import ApplicantsTable from "./ApplicantTable";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../utils/data";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants, setSingleApplication } from "../redux/applicationSlice";

export default function Applicants() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applications } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${id}/applicants`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setApplicants(res.data.job.applications));
          dispatch(setSingleApplication(res.data.job));
          console.log("Fetched applicants:", res.data);
        } else {
          console.log("Failed to fetch applicants:", res.data.message);
        }
      } catch (error) {
        console.error(error.response?.data?.message || "Something went wrong");
      }
    };

    fetchAllApplicants();
  }, [dispatch, id]);

  return (
    <div>
      <Navbar />
      <h1>Applicants ({applications?.length || 0})</h1>
      <ApplicantsTable />
    </div>
  );
}
