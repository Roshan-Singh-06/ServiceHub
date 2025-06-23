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
    icon: "",
  });
  const [loading, setLoading] = useState(false);
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
          setCategoryOptions(res.data.categories || []);
          if (!res.data.categories || res.data.categories.length === 0) {
            toast.error("No categories found for this service. Check service name in backend model.");
          }
        } else {
          setCategoryOptions([]);
        }
      } catch (err) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Debug: log what is being sent
      console.log({
        service: serviceName,
        category: formData.category,
        icon: formData.icon,
      });
      if (!serviceName || !formData.category || !formData.icon) {
        toast.error("All fields are required.");
        setLoading(false);
        return;
      }
      await createSubService({
        service: serviceName,
        category: formData.category,
        icon: formData.icon,
      });
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
          <label className="block text-sm font-medium mb-1">Icon</label>
          <input
            type="text"
            name="icon"
            required
            value={formData.icon}
            onChange={handleChange}
            placeholder="e.g. 🚿 or fa-solid fa-wrench"
            className="w-full px-4 py-2 border rounded-md"
          />
          {formData.icon && (
            <span className="text-3xl mt-2 inline-block">{formData.icon}</span>
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
