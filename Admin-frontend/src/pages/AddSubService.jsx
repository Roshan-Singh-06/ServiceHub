import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createSubService, getServiceById } from "../services/api";
import { getSubServiceCategories } from "../services/subserviceApi";

const AddSubService = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await getServiceById(serviceId);
        setServiceName(data.data?.serviceName || "");
        // Fetch subservice categories for this service
        if (data.data?.serviceName) {
          const res = await getSubServiceCategories(data.data.serviceName);
          console.log("Fetched categories for", data.data.serviceName, res.data); // DEBUG
          setCategoryOptions(res.data.categories || []);
        } else {
          setCategoryOptions([]);
        }
      } catch (err) {
        console.error("Error fetching service or categories", err); // DEBUG
        setServiceName("");
        setCategoryOptions([]);
      }
    };
    fetchService();
  }, [serviceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("service", serviceId);
      data.append("category", formData.category);
      if (formData.image) data.append("image", formData.image);
      await createSubService(data);
      toast.success("SubService added successfully!");
      navigate("/services");
    } catch (error) {
      toast.error("Failed to add subservice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2 text-center text-[#5c7c89]">
        Add SubService
      </h1>
      {serviceName && (
        <h2 className="text-lg font-semibold mb-6 text-center text-[#1f4959]">
          For Service: {serviceName}
        </h2>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow rounded-lg p-6"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            SubService Category
          </label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="" disabled>
              Select subservice category
            </option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded mt-2"
            />
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-[#5c7c89] hover:bg-[#1f4959] text-white rounded-md font-semibold"
        >
          {loading ? "Adding..." : "Add SubService"}
        </button>
      </form>
    </div>
  );
};

export default AddSubService;
