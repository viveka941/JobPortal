import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "../component/redux/companySlice";
import { COMPANY_API_ENDPOINT } from "../component/utils/data";
import axios from "axios";

export default function UseGetAllCompany() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompany();
  }, []);
  return null;
}
