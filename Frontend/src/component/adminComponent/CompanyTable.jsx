import React from "react";

export default function CompanyTable() {
  const companies = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      name: "Google",
      website: "https://www.google.com",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      name: "Microsoft",
      website: "https://www.microsoft.com",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      name: "Amazon",
      website: "https://www.amazon.com",
    },
  ];

  return (
    <div className="p-4">
      <table className="w-full border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Company Logo</th>
            <th className="p-2 border">Company Name</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Action </th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index} className="text-center border-t hover:bg-gray-50">
              <td className="p-2 border">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-10 mx-auto"
                />
              </td>
              <td className="p-2 border">{company.name}</td>
              <td className="p-2 border">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {company.website}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
