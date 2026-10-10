import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CustomerLogin from "./CustomerLogin";
import StaffLogin from "./StaffLogin";
import CustomerPage from "./CustomerPage";
import StaffDashboard from "./StaffDashboard";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Customer Login */}
        <Route
          path="/customer-login"
          element={<CustomerLogin />}
        />

        {/* Staff Login */}
        <Route
          path="/staff-login"
          element={<StaffLogin />}
        />

        {/* Customer Portal */}
        <Route
          path="/"
          element={
            localStorage.getItem("user") &&
            JSON.parse(localStorage.getItem("user")).role === "CUSTOMER"
              ? <CustomerPage />
              : <Navigate to="/customer-login" />
          }
        />

        {/* Staff Dashboard */}
        <Route
          path="/staff"
          element={
            localStorage.getItem("user") &&
            JSON.parse(localStorage.getItem("user")).role === "STAFF"
              ? <StaffDashboard />
              : <Navigate to="/staff-login" />
          }
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/customer-login" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;