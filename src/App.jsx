import "./css/style.css";

import getFirebase from "./firebase/firebase";

import { createRoot } from "react-dom/client";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FirebaseContext from "./auth/FirebaseContext";
import UserContext from "./auth/UserContext";

import Index from "./pages/Index";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";

const fb = getFirebase();

const App = () => {
  const fireThingsHook = useState(fb);
  const userHook = useState({});

  return (
    <div className="h-full">
      <BrowserRouter>
        <FirebaseContext.Provider value={fireThingsHook}>
          <UserContext.Provider value={userHook}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
