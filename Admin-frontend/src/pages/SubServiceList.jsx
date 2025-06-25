import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

const SubServiceList = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [subservices, setSubservices] = useState([]);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch parent service details
        const serviceRes = await api.get(`/service/${serviceId}`);
        setService(serviceRes.data.data);
        // Fetch subservices for this service
        const subRes = await api.get(
          `/subservice?service=${encodeURIComponent(serviceRes.data.data.serviceName)}`
        );
        setSubservices(subRes.data.data);
      } catch (err) {
        setError("Failed to load subservices.");
      } finally {
        setLoading(false);
      }
    };
    if (location.state && location.state.updated) {
      fetchData();
      window.history.replaceState({}, document.title);
    } else {
      fetchData();
    }
  }, [serviceId, location.state]);

  // Edit handler
  const handleEdit = (subservice) => {
    navigate(`/edit-subservice/${subservice._id}`);
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subservice?")) {
      try {
        await api.delete(`/subservice/${id}`);
        setSubservices((prev) => prev.filter((s) => s._id !== id));
      } catch (err) {
        alert("Failed to delete subservice.");
      }
    }
  };
  const handleAddNested = (sub) => {
    navigate("/add-nestedservice", {
      state: {
        subservice: sub.category,
        serviceId: service?._id, // or serviceId if you have it
        serviceName: service?.serviceName, // optional, for display
      },
    });
  };
  const handleViewNested = (sub) => {
    navigate("/nestedservices", {
      state: {
        subservice: sub.category,
        serviceId: service?._id,
        serviceName: service?.serviceName,
      },
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-xl font-semibold text-primary">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-xl font-semibold text-red-500">
        {error}
      </div>
    );

  // ServiceHub color palette (example):
  // Primary: #1e293b (slate-800), Accent: #fbbf24 (amber-400), Secondary: #f1f5f9 (slate-100), Text: #0f172a (slate-900)

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-100 via-white">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-slate-800 flex items-center gap-3">
          <span className="inline-block w-2 h-8 bg-[#1f4959] rounded-full mr-2"></span>
          Subservices for:{" "}
          <span className="ml-2 text-[#1f4959]">
            {service ? service.serviceName : "Service"}
          </span>
        </h2>
        {subservices.length === 0 ? (
          <div className="text-lg text-slate-500 text-center py-12">
            No subservices found for this service.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl shadow-md">
              <thead>
                <tr className="bg-[#b6e2f4] text-slate-800">
                  <th className="py-4 px-6 border-b text-left font-semibold rounded-tl-xl">
                    Category
                  </th>
                  <th className="py-4 px-6 border-b text-left font-semibold">
                    Icon
                  </th>
                  <th className="py-4 px-6 border-b text-left font-semibold">
                    Image
                  </th>
                  <th className="py-4 px-6 border-b text-left font-semibold rounded-tr-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {subservices.map((sub, idx) => (
                  <tr
                    key={sub._id}
                    className={`transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-[#eaf6fb]"
                    } hover:bg-[#b6d9e8]`}
                  >
                    <td className="py-4 px-6 border-b text-slate-900 text-base font-medium align-middle min-w-[160px]">
                      {sub.category}
                    </td>
                    <td className="py-4 px-6 border-b align-middle">
                      {sub.icon ? (
                        <span className="text-3xl flex items-center justify-center">
                          {sub.icon}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">No icon</span>
                      )}
                    </td>
                    <td className="py-4 px-6 border-b align-middle">
                      {sub.image ? (
                        <img
                          src={sub.image}
                          alt={sub.category}
                          className="w-20 h-20 object-cover rounded-lg border border-slate-200 shadow"
                        />
                      ) : (
                        <span className="text-slate-400 italic">No image</span>
                      )}
                    </td>
                    <td className="py-4 px-6 border-b align-middle">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-1 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-amber-300"
                          onClick={() => handleEdit(sub)}
                          title="Edit Subservice"
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-red-300"
                          onClick={() => handleDelete(sub._id)}
                          title="Delete Subservice"
                        >
                          Delete
                        </button>
                        <button
                          className="bg-[#1f4959] hover:bg-[#16323e] text-white font-bold py-1 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-[#1f4959]"
                          onClick={() => handleAddNested(sub)}
                          title="Add Nested Service"
                        >
                          + Nested Service
                        </button>
                        <button
                          className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-slate-400"
                          onClick={() => handleViewNested(sub)}
                          title="View Nested Services"
                        >
                          View Nested
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubServiceList;
