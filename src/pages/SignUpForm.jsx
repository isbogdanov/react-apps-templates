import { useState, useContext, useEffect } from "react";
import FirebaseContext from "../auth/FirebaseContext";
import UserContext from "../auth/UserContext";

import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { onAuthStateChanged } from "firebase/auth";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [accountCreationError, setAccountCreationError] = useState("");
  const [{ auth }] = useContext(FirebaseContext);

  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log("Current user:", user);
    });

    console.log("Auth object:", auth);
  }, [auth]);

  return (
    <form
      className="form-signup"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        console.log("log email:", email, password);

        await createUserWithEmailAndPassword(auth, email, password)
          .then((user) => {
            console.log("Registered and logged in, updating name:", user);
            setUser(auth.currentUser);
            updateProfile(auth.currentUser, {
              displayName: name,
            })
              .then(() => {
                setAccountCreationError("");
                navigate("/dashboard");
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            let authError = error;
            let errorCode = authError.code;
            let errorMessage = "";

            console.log("Error code:", errorCode);

            if (errorCode === "auth/weak-password") {
              errorMessage = "Weak password";
            } else if (errorCode === "auth/email-already-in-use") {
              errorMessage = "Account already exists";
            }
            setAccountCreationError(errorMessage);

            console.log(error);
          });
      }}
    >
      <h1 className="h3 fw-normal mb-3">Please sign up</h1>
      <div>{accountCreationError}</div>
      <div className="relative">
        <input
          type="text"
          id="floatingInputName"
          name="name"
          className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent bg-white px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 "
          placeholder=" "
        />
        <label
          htmlFor="floatingInputName"
          className="absolute left-1 top-2 z-10 origin-[0] -translate-y-2 scale-75 transform px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 "
        >
          Name
        </label>
      </div>

      <div className="relative">
        <input
          type="email"
          id="floatingInputEmail"
          name="email"
          className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent bg-white px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
          placeholder=" "
        />
        <label
          htmlFor="floatingInputEmail"
          className="absolute left-1 top-2 z-10 origin-[0] -translate-y-2 scale-75 transform px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
        >
          Email address
        </label>
      </div>
      <div className="relative">
        <input
          type="password"
          name="password"
          id="floatingInputPassword"
          placeholder=" "
          className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent bg-white px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 "
        />
        <label
          htmlFor="floatingInputPassword"
          className="absolute left-1 top-2 z-10 origin-[0] -translate-y-2 scale-75 transform px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 "
        >
          Password
        </label>
      </div>
      <button className="login-btn" type="submit">
        Sign up
      </button>

      <p className="mt-7">&copy; 2023</p>
    </form>
  );
};

export default SignUpForm;
