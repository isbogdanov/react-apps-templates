import { useState, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import SignInForm from "./SignInForm";
import UserContext from "../auth/UserContext";
import FirebaseContext from "../auth/FirebaseContext";
import { useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const Index = () => {
  const navigate = useNavigate();
  const [fb, setFb] = useContext(FirebaseContext);
  const [user, setUser] = useContext(UserContext);
  const [loginStatus, setLoginStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("already auth", user);
        navigate(`/dashboard`);
      } else {
        setLoginStatus(false);
      }
    });
  }, []);

  return loginStatus ? null : <SignInForm />;
};
export default Index;
