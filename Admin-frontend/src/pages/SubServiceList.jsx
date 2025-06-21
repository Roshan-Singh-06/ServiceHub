import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const SubServiceList = () => {
  const { serviceId } = useParams();
  const [subservices, setSubservices] = useState([]);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch parent service details
        const serviceRes = await api.get(`/services/${serviceId}`);
        setService(serviceRes.data);
        // Fetch subservices for this service
        const subRes = await api.get(`/subservices/service/${serviceId}`);
        setSubservices(subRes.data);
      } catch (err) {
        setError("Failed to load subservices.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [serviceId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Subservices for: {service ? service.name : "Service"}
      </h2>
      {subservices.length === 0 ? (
        <div>No subservices found for this service.</div>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Image</th>
            </tr>
          </thead>
          <tbody>
            {subservices.map((sub) => (
              <tr key={sub._id}>
                <td className="py-2 px-4 border">{sub.category}</td>
                <td className="py-2 px-4 border">
                  {sub.imageUrl ? (
                    <img src={sub.imageUrl} alt={sub.category} className="h-16" />
                  ) : (
                    "No image"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubServiceList;
