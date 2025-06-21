import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./layout/Layout";
import ServicesList from "./pages/ServicesList";
import AddServices from "./pages/AddServices";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import Bookings from "./pages/Bookings";
import CreateAdmin from "./pages/CreateAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import EditService from "./pages/EditService";
import AddSubService from "./pages/AddSubService";
import SubServiceList from "./pages/SubServiceList";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="splash"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SplashScreen />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Router>
              <Toaster position="top-right" />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/services" element={<ServicesList />} />
                  <Route path="/add-services" element={<AddServices />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/Bookings" element={<Bookings />} />
                  <Route path="/create-admin" element={<CreateAdmin />} />
                  <Route path="/edit-service/:id" element={<EditService />} />
                  <Route path="/add-subservice/:serviceId" element={<AddSubService />} />
                  <Route path="/subservices/:serviceId" element={<SubServiceList />} />
                </Route>
              </Routes>
            </Router>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
