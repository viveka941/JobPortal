import React, { useEffect } from 'react'
import axios from 'axios'
import { JOB_API_ENDPOINT } from '../component/utils/data'
import { setAllJobs } from '../component/redux/jobSlice'
import {useDispatch, useSelector} from 'react-redux'

export default function UserGetAllJobs() {
  const dispatch = useDispatch();
  const {searchQuery}=useSelector(store=>store.job )
  useEffect(() => {
    const fethAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${searchQuery}`,
          {
            withCredentials: true,
          }
        );
       
        if (res.data) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fethAllJobs();
  }, [dispatch]);
 
}
