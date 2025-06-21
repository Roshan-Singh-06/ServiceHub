import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getServices, deleteService } from "../services/api";
import toast from "react-hot-toast";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await getServices();
      setServices(data.data || []);
    } catch (error) {
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
      toast.success("Service deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete service");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Service Management
        </h1>
        <Link
          to="/add-services" 
          className="inline-block bg-[#5c7c89] hover:bg-[#1f4959] text-white px-4 py-1 rounded mr-2 font-semibold transition-colors duration-200"
        >
          + Add New Service
        </Link>
      </div>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {services.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500 dark:text-gray-400"
                >
                  No services found.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr
                  key={service._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={service.image}
                      alt={service.serviceName}
                      className="h-14 w-14 rounded-lg object-cover border border-gray-200 dark:border-gray-700 shadow"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800 dark:text-white">
                    {service.serviceName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300 max-w-xs truncate">
                    {service.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#1f4959] dark:text-blue-300 font-bold">
                    ₹{service.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Link
                      to={`/edit-service/${service._id}`}
                      className="inline-block bg-[#5c7c89] hover:bg-[#1f4959] text-white px-4 py-1 rounded mr-2 font-semibold transition-colors duration-200"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="inline-block bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded font-semibold transition-colors duration-200"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/add-subservice/${service._id}`}
                      className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded font-semibold transition-colors duration-200 ml-2"
                    >
                      Add SubService
                    </Link>
                    <Link
                      to={`/subservices/${service._id}`}
                      className="inline-block bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded font-semibold transition-colors duration-200 ml-2"
                    >
                      View SubServices
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesList;
