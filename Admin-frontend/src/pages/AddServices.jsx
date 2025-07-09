import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createService } from "../services/api";
import toast from "react-hot-toast";

const SERVICE_CATEGORIES = [
  "Plumbing Services",
  "Painting Services",
  "Cleaning Services",
  "Appliance Repair",
  "Women Salon & Spa",
  "Men's Salon & Spa",
  "AC Repair and Services",
  "Electrical Services",
  
];

const AddService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    price: "",
    image: null,
    video: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, video: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("serviceName", formData.serviceName.trim());
      data.append("description", formData.description);
      data.append("price", formData.price);
      if (formData.image) data.append("image", formData.image);
      if (formData.video) data.append("video", formData.video);
      await createService(data);
      toast.success("Service added successfully!");
      navigate("/services");
    } catch (error) {
      toast.error("Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-[#1f4959] mb-8">
        Add New Service
      </h1>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Service Name <span className="text-red-500">*</span>
            </label>
            <select
              name="serviceName"
              required
              value={formData.serviceName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-[#5c7c89] focus:border-[#5c7c89] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select a service</option>
              {SERVICE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Service Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-[#5c7c89] focus:border-[#5c7c89] dark:bg-gray-700 dark:border-gray-600 dark:text-white
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[#e3e8ee] file:text-[#1f4959]
              hover:file:bg-[#d1d5db]"
              required
            />
          </div>
          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Service Video <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-[#5c7c89] focus:border-[#5c7c89] dark:bg-gray-700 dark:border-gray-600 dark:text-white
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[#e3e8ee] file:text-[#1f4959]
              hover:file:bg-[#d1d5db]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload a demonstration video for this service (Max: 100MB, MP4/AVI/MOV)
            </p>
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              required
              placeholder="e.g. Interior, exterior painting, wall texturing, and color..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-[#5c7c89] focus:border-[#5c7c89] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Starting Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              required
              placeholder="e.g. 299"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-[#5c7c89] focus:border-[#5c7c89] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5c7c89] hover:bg-[#1f4959] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5c7c89] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? "Adding Service..." : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
