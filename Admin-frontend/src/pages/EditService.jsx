import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getServices, updateService } from "../services/api";
import toast from "react-hot-toast";

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    price: "",
    image: null,
    video: null,
  });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVideo, setPreviewVideo] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await getServices();
        const service = (data.data || []).find((s) => s._id === id);
        if (!service) throw new Error("Service not found");
        setFormData({
          serviceName: service.serviceName,
          description: service.description,
          price: service.price,
          image: null,
          video: null,
        });
        setPreviewImage(service.image || "");
        setPreviewVideo(service.video || "");
      } catch (error) {
        toast.error("Failed to fetch service details");
        navigate("/services");
      }
    };
    fetchService();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, video: file }));
      setPreviewVideo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("serviceName", formData.serviceName);
      data.append("description", formData.description);
      data.append("price", formData.price);
      if (formData.image) data.append("image", formData.image);
      if (formData.video) data.append("video", formData.video);
      // Debug: log form data before sending
      for (let pair of data.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      await updateService(id, data);
      toast.success("Service updated successfully!");
      navigate("/services", { state: { updated: true } });
    } catch (error) {
      toast.error("Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Edit Service
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Service Name
            </label>
            <input
              type="text"
              name="serviceName"
              required
              placeholder="Enter service name"
              value={formData.serviceName}
              onChange={handleChange}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5c7c89] hover:bg-[#1f4959] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5c7c89] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              required
              placeholder="Enter service description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              required
              placeholder="Enter service price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-md mt-2"
              />
            )}
          </div>
          
          {/* Video Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Service Video <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[#e3e8ee] file:text-[#1f4959]
              hover:file:bg-[#d1d5db]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload a demonstration video for this service (Max: 100MB, MP4/AVI/MOV)
            </p>
            {previewVideo && (
              <div className="mt-2">
                <video
                  src={previewVideo}
                  className="w-32 h-20 object-cover rounded-md border border-gray-200 shadow"
                  controls
                  muted
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? "Updating Service..." : "Update Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditService;
