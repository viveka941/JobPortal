import React, { useEffect } from "react";
import axios from "axios"; 
import { useDispatch } from "react-redux";
import { COMPANY_API_ENDPOINT } from "../component/utils/data";
import { setSingleCompany } from "../component/redux/companySlice";

export default function UseGetCompanyById(companyId) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        if (res.data) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (companyId) {
      fetchSingleCompany();
    }
  }, [companyId, dispatch]);
}
