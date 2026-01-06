import React, { useState, useEffect } from "react";
import Register from "./features/auth/Register";
import Dashboard from "./features/dashboard/Dashboard";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("nano_key"));

  return (
    <div className="selection:bg-[#00FFB2] selection:text-slate-900">
      {isAuth ? (
        <Dashboard />
      ) : (
        <Register onAuthSuccess={() => setIsAuth(true)} />
      )}
    </div>
  );
}

export default App;
