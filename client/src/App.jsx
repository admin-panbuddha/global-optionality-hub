import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Countries from "./pages/Countries";
import Equities from "./pages/Equities";
import Themes from "./pages/Themes";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/equities" element={<Equities />} />
        <Route path="/themes" element={<Themes />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
