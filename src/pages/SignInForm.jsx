import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

const SignInForm = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(getAuth());
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    console.log("sign-in");
  }, []);

  return (
    <div className="flex h-full items-center">
      <div className="form-block">
        <form
          className="form-signin test"
          onSubmit={async (e) => {
            e.preventDefault();
            console.log("submittin form");
            const formData = new FormData(e.target);

            const email = formData.get("email");
            const password = formData.get("password");

            await signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                console.log(userCredential.user);
                navigate("/dashboard");
              })
              .catch((error) => {
                setAuthError("Wrong credentials");
                console.error(error);
              });
          }}
        >
          <h1 className="h3 fw-normal mb-3">Please sign in</h1>
          <div>{authError}</div>
          <div className="relative">
            <input
              type="email"
              id="floatingInputEmail"
              name="email"
              className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent bg-white px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 "
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
              className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent bg-white px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 "
              id="floatingPassword"
              placeholder=" "
            />
            <label
              htmlFor="floatingPassword"
              className="absolute left-1 top-2 z-10 origin-[0] -translate-y-2 scale-75 transform px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 "
            >
              Password
            </label>
          </div>

          <button className="login-btn" type="submit">
            Sign in
          </button>
          <p className="mt-7">&copy; 2023</p>
        </form>
        <Link to={`/sign-up`} className="mt-4 block text-indigo-700 underline ">
          Sign up here
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
