import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import SignUpForm from "./SignUpForm";

import FirebaseContext from "../auth/FirebaseContext";
import UserContext from "../auth/UserContext";

import { signOut } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
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

  return loginStatus ? null : (
    <div className="flex h-full items-center">
      <div className="form-block">
        <SignUpForm />
        <Link to={`/`} className="mt-4 block text-indigo-700 underline">
          Sign in here
        </Link>

        {user && !user.isAnonymous ? (
          <button
            href=""
            className="mt-4 inline text-center text-indigo-700 underline"
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
  );
};

export default SignUpPage;
