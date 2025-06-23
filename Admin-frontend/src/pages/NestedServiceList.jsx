import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

const NestedServiceList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // subservice name and serviceId passed via location.state
  const subservice = location.state?.subservice;
  const serviceId = location.state?.serviceId;
  const serviceName = location.state?.serviceName;
  const [nestedServices, setNestedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNested = async () => {
      try {
        const res = await api.get(`/nestedservice?subservice=${encodeURIComponent(subservice)}`);
        // Debug: log image field for each nested service
        if (res.data && res.data.data) {
          res.data.data.forEach(ns => {
            // eslint-disable-next-line no-console
            console.log('NestedService image:', ns.image);
          });
        }
        setNestedServices(res.data.data);
      } catch (err) {
        setError("Failed to load nested services.");
      } finally {
        setLoading(false);
      }
    };
    if (subservice) fetchNested();
  }, [subservice]);

  const handleEdit = (ns) => {
    navigate("/edit-nestedservice/" + ns._id, { state: { subservice, serviceId, serviceName } });
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this nested service?")) {
      try {
        await api.delete(`/nestedservice/${id}`);
        setNestedServices((prev) => prev.filter((n) => n._id !== id));
      } catch (err) {
        alert("Failed to delete nested service.");
      }
    }
  };
  const handleAdd = () => {
    navigate("/add-nestedservice", { state: { subservice, serviceId, serviceName } });
  };

  if (loading)
    return <div className="flex justify-center items-center h-64 text-xl font-semibold text-primary">Loading...</div>;
  if (error)
    return <div className="flex justify-center items-center h-64 text-xl font-semibold text-red-500">{error}</div>;

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-100 via-white">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-slate-800 flex items-center gap-3">
          <span className="inline-block w-2 h-8 bg-[#1f4959] rounded-full mr-2"></span>
          Nested Services for: <span className="ml-2 text-[#1f4959]">{subservice}</span>
        </h2>
        <button
          className="mb-6 bg-[#1f4959] hover:bg-[#16323e] text-white font-bold py-2 px-6 rounded shadow"
          onClick={handleAdd}
        >
          + Add Nested Service
        </button>
        {nestedServices.length === 0 ? (
          <div className="text-lg text-slate-500 text-center py-12">No nested services found for this subservice.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl shadow-md">
              <thead>
                <tr className="bg-[#b6e2f4] text-slate-800">
                  <th className="py-4 px-6 border-b text-left font-semibold rounded-tl-xl">Name</th>
                  <th className="py-4 px-6 border-b text-left font-semibold">Price (₹)</th>
                  <th className="py-4 px-6 border-b text-left font-semibold">Time</th>
                  <th className="py-4 px-6 border-b text-left font-semibold">Description</th>
                  <th className="py-4 px-6 border-b text-left font-semibold">Image</th>
                  <th className="py-4 px-6 border-b text-left font-semibold rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {nestedServices.map((ns, idx) => (
                  <tr
                    key={ns._id}
                    className={`transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-[#eaf6fb]"} hover:bg-[#b6d9e8]`}
                  >
                    <td className="py-4 px-6 border-b text-slate-900 text-base font-medium align-middle min-w-[160px]">{ns.name}</td>
                    <td className="py-4 px-6 border-b align-middle">₹{ns.price}</td>
                    <td className="py-4 px-6 border-b align-middle">{ns.time}</td>
                    <td className="py-4 px-6 border-b align-middle">{ns.desc}</td>
                    <td className="py-4 px-6 border-b align-middle">
                      {ns.image ? (
                        <img
                          src={ns.image}
                          alt={ns.name}
                          className="w-20 h-20 object-cover rounded-lg border border-slate-200 shadow"
                        />
                      ) : (
                        <span className="text-slate-400 italic">No image</span>
                      )}
                    </td>
                    <td className="py-4 px-6 border-b align-middle">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-1 px-4 rounded shadow"
                          onClick={() => handleEdit(ns)}
                          title="Edit Nested Service"
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded shadow"
                          onClick={() => handleDelete(ns._id)}
                          title="Delete Nested Service"
                        >
                          Delete
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

export default NestedServiceList;
