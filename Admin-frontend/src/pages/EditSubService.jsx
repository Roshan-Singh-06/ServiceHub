import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const EditSubService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    category: "",
    icon: "",
    image: null, // Add image to formData
    currentImage: "", // For displaying current image
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubService = async () => {
      try {
        const { data } = await api.get(`/subservice?`);
        const subservice = (data.data || []).find((s) => s._id === id);
        if (!subservice) throw new Error("Subservice not found");
        setFormData({
          category: subservice.category,
          icon: subservice.icon || "",
          image: null,
          currentImage: subservice.image || "",
        });
      } catch (error) {
        toast.error("Failed to fetch subservice details");
        navigate(-1);
      }
    };
    fetchSubService();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("category", formData.category);
      data.append("icon", formData.icon);
      if (formData.image) data.append("image", formData.image);
      await api.put(`/subservice/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Subservice updated successfully");
      navigate(-1, { state: { updated: true } });
    } catch (error) {
      toast.error("Failed to update subservice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 via-white to-amber-100">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-[#1f4959]">Edit Subservice</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Icon</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="e.g. 🚿 or fa-solid fa-wrench"
              className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
              required
            />
            {formData.icon && (
              <span className="text-3xl mt-2 inline-block">{formData.icon}</span>
            )}
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Image</label>
            {formData.currentImage && (
              <img
                src={formData.currentImage}
                alt="Current"
                className="w-20 h-20 object-cover rounded-lg border border-slate-200 shadow mb-2"
              />
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 rounded shadow mt-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSubService;
