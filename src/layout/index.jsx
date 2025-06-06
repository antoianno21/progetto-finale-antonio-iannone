import { Outlet } from "react-router";
import Header from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export default function Markup() {
  return (
    <div className="container">
      <Header />
      <div className="gridLayout">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}