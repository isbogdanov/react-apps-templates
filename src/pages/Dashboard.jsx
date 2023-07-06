import React, { useState, useContext, useEffect } from "react";

import Heading from "../partials/Heading";

import FirebaseContext from "../auth/FirebaseContext";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { signOut } from "firebase/auth";

function Dashboard() {
  const [fb, setFb] = useContext(FirebaseContext);
  const [user, setUser] = useContext(UserContext);

  const [loginStatus, setLoginStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
        navigate(`/`);
      }
    });
  }, []);

  return loginStatus ? (
    <div className="flex h-screen items-center overflow-hidden">
      <div className="mt-5 w-full text-center">
        <Heading headingValue="Password Protected Area" />
        {user && !user.isAnonymous ? (
          <button
            href=""
            className="mt-4 text-indigo-700 underline"
            onClick={(e) => {
              e.preventDefault();
              signOut(fb.auth);
            }}
          >
            Sign Out
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  ) : null;
}

export default Dashboard;
