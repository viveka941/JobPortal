import React from "react";
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold">JobHub</h2>
          <p className="text-gray-400 mt-2">
            Your gateway to finding the perfect job. Connect with top recruiters
            worldwide.
          </p>
          <Link to={"/PrivacyPolicy"} className="text-gray-400 mt-2 hover:text-blue-400 transition" >
            Privacy Policy
          </Link>
          <br />
          <Link
            to={"/termsofService"}
            className="text-gray-400 mt-2 hover:text-blue-400 transition "
            
          >
            terms of Service
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl">
              📘
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl">
              🐦
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl">
              📸
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl">
              💼
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} JobHub. All Rights Reserved.
      </div>
    </footer>
  );
}
