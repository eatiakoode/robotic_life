"use client";
import { useEffect, useState } from "react";
import { getPropertyEnquiryTableData } from "@/api/propertyenquiry";

const AuthorReview = () => {
  const [enquiryList, setEnquiryList] = useState([]);

  useEffect(() => {
    const fetchEnquiryData = async () => {
      const data = await getPropertyEnquiryTableData();
      setEnquiryList(data || []);
    };
    fetchEnquiryData();
  }, []);

  return (
    <div className="grid gap-4">
      {enquiryList.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow-md rounded-xl p-5 border border-gray-200 transition hover:shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Phone:</span> {item.phone}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Email:</span> {item.email}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Budget:</span> {item.budget}
              </p>
            </div>

            <div className="text-sm text-right text-gray-400 mt-2 md:mt-0">
              <p>
                Enquiry At:{" "}
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <hr className="my-3" />

          <div className="text-sm text-gray-600">
            <p className="mb-1">
              <span className="font-semibold text-gray-700">For Property:</span>{" "}
              {item?.propertyid?.title || "N/A"}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">For Seller:</span>{" "}
              {item?.sellerid?.title || "N/A"}
            </p>
            <p className="italic text-gray-700">"{item.message}"</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuthorReview;
