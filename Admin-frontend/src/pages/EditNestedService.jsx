import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

const fetchNestedServiceNameEnums = async () => {
  const res = await api.get("/nestedservice/names-enum");
  return res.data.data;
};

const EditNestedService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const subservice = location.state?.subservice;
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    time: "",
    desc: "",
    image: null, // for file input
  });
  const [nameOptions, setNameOptions] = useState([]);
  const [nameEnum, setNameEnum] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enumObj, res] = await Promise.all([
          fetchNestedServiceNameEnums(),
          api.get(`/nestedservice/${id}`),
        ]);
        setNameEnum(enumObj);
        setNameOptions(enumObj[subservice] || []);
        setFormData({
          name: res.data.data.name,
          price: res.data.data.price,
          time: res.data.data.time,
          desc: res.data.data.desc,
          image: res.data.data.image || null,
        });
      } catch (err) {
        toast.error("Failed to load nested service");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, subservice]);

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
    try {
      const data = new FormData();
      data.append('subservice', subservice);
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('time', formData.time);
      data.append('desc', formData.desc);
      if (formData.image && typeof formData.image !== 'string') data.append('image', formData.image);
      await api.put(`/nestedservice/${id}`, data);
      toast.success("Nested service updated successfully!");
      navigate("/nestedservices", {
        state: {
          subservice,
          serviceId: location.state?.serviceId,
          serviceName: location.state?.serviceName,
        },
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to update nested service"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-xl font-semibold text-primary">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2 text-center text-[#5c7c89]">
        Edit Nested Service
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
              {subservice ? "Select nested service" : "No subservice selected"}
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
          {formData.image && typeof formData.image === 'string' && (
            <img src={formData.image} alt="Current" className="mt-2 w-24 h-24 object-cover rounded" />
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-[#5c7c89] hover:bg-[#1f4959] text-white rounded-md font-semibold"
        >
          {loading ? "Updating..." : "Update Nested Service"}
        </button>
      </form>
    </div>
  );
};

export default EditNestedService;
