import React from "react";
import Navbar from "./Navbar";
import Header from "./components/Header";
import Categories from "./components/Categories";
import LatestJobs from "./components/LatestJobs";
import Footer from "./components/Footer";
import UserGetAllJobs from "../hook/UserGetAllJobs"; // ✅ Ensure correct import path

export default function Home() {
  return (
    <div>
      <UserGetAllJobs /> {/* ✅ Correct usage as a component */}
      <Navbar />
      <Header />
      <Categories />
      <LatestJobs />
      <Footer />
    </div>
  );
}
