import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { getNestedServices } from "../services/nestedserviceApi";

// Fetch nested service name enums from backend
const fetchNestedServiceNameEnums = async () => {
  const res = await api.get("/nestedservice/names-enum");
  return res.data.data; // Should be an object: { 'Bath fittings': [ ... ], ... }
};

const AddNestedService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get subservice from location.state (required)
  const subservice = location.state?.subservice;
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    time: "",
    desc: "",
    image: null, // for file input
  });
  const [nestedServices, setNestedServices] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameEnum, setNameEnum] = useState({});

  // Fetch enums from backend on mount
  useEffect(() => {
    fetchNestedServiceNameEnums()
      .then((enumObj) => {
        setNameEnum(enumObj);
        if (subservice && enumObj[subservice]) {
          setNameOptions(enumObj[subservice]);
        }
      })
      .catch(() => setNameEnum({}));
    getNestedServices()
      .then((res) => setNestedServices(res.data.data))
      .catch(() => setNestedServices([]));
  }, [subservice]);

  // If subservice changes, update name options
  useEffect(() => {
    if (subservice && nameEnum[subservice]) {
      setNameOptions(nameEnum[subservice]);
      setFormData((prev) => ({ ...prev, name: "" }));
    } else {
      setNameOptions([]);
      setFormData((prev) => ({ ...prev, name: "" }));
    }
  }, [subservice, nameEnum]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Debug: log the image file before appending
    console.log('Image file:', formData.image);
    try {
      const data = new FormData();
      data.append('subservice', subservice);
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('time', formData.time);
      data.append('desc', formData.desc);
      if (formData.image) data.append('image', formData.image);
      await api.post("/nestedservice", data);
      toast.success("Nested service added successfully!");
      // After add, go to NestedServiceList for this subservice
      navigate("/nestedservices", {
        state: {
          subservice,
          serviceId: location.state?.serviceId,
          serviceName: location.state?.serviceName,
        },
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to add nested service"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2 text-center text-[#5c7c89]">
        Add Nested Service
      </h1>
      {subservice && (
        <h2 className="text-lg font-semibold mb-6 text-center text-[#1f4959]">
          For Subservice: <span className="text-[#5c7c89]">{subservice}</span>
        </h2>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow rounded-lg p-6"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Nested Service Category
          </label>
          <select
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            disabled={!subservice}
          >
            <option value="" disabled>
              {subservice
                ? "Select nested service"
                : "No subservice selected"}
            </option>
            {nameOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full px-4 py-2 border rounded-md"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time</label>
          <input
            type="text"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            placeholder="e.g. 30 mins"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="desc"
            required
            value={formData.desc}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full px-4 py-2 border rounded-md"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-[#5c7c89] hover:bg-[#1f4959] text-white rounded-md font-semibold"
        >
          {loading ? "Adding..." : "Add Nested Service"}
        </button>
      </form>

      {/* Display existing nested services */}
      <div className="mt-10">
        <h3 className="text-lg font-bold mb-3 text-[#1f4959]">
          Existing Nested Services
        </h3>
        {nestedServices.filter((ns) => ns.subservice === subservice).length === 0 ? (
          <div className="text-slate-500 italic">No nested services found.</div>
        ) : (
          <ul className="space-y-3">
            {nestedServices
              .filter((ns) => ns.subservice === subservice)
              .map((ns) => (
                <li
                  key={ns._id}
                  className="bg-[#eaf6fb] rounded p-3 shadow text-slate-800"
                >
                  <strong>{ns.name}</strong> (₹{ns.price}, {ns.time})
                  <br />
                  <span className="text-slate-600">{ns.desc}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddNestedService;