import React, { useState } from "react";
import logo_sologan from "./assets/logo_sologan.svg";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default link behavior
    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Login successful", data);
      setLoginError("");
      // Check if the response contains "found user"
      if (data["found user"]) {
        // Redirect to home page
        navigate("/home");
      }
    } else {
      console.error("Login failed", data);
      setLoginError("Login failed. Please check your phone number and password.");
    }
  };

  return (
    <div className="overscroll-behavior-y: none; relative h-screen w-screen overflow-scroll">
      <div className="absolute overflow-auto overscroll-none">
        <div className="flex h-screen flex-col items-center">
          <div className="my-6 h-60 w-64">
            <img src={logo_sologan} alt="logo_sologan" className="w-full" />
          </div>

          <div className="relative w-screen overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 614"
              fill="none"
              className="w-full"
            >
              <g filter="url(#filter0_if_522_2317)">
                <path
                  d="M1440 18.9028V614H0V121.002C393.295 -89.1569 749.133 42.5528 749.133 42.5528C780.347 50.8207 814.682 56.7813 850.578 60.8191C1102.37 88.1225 1440 18.9028 1440 18.9028Z"
                  fill="#67BC47"
                />
              </g>
              <defs>
                <filter
                  id="filter0_if_522_2317"
                  x="-1"
                  y="0.802582"
                  width="1442"
                  height="614.197"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="5.5" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_522_2317"
                  />
                  <feGaussianBlur
                    stdDeviation="0.5"
                    result="effect2_foregroundBlur_522_2317"
                  />
                </filter>
              </defs>
            </svg>
            <div className="block h-screen w-screen bg-[#67BC46]"></div>
            <div className="absolute left-2/4 top-1/4 inline-block h-full">
              {isSignIn ? (
                <div className="relative flex h-full w-96 -translate-x-2/4 flex-col items-center rounded-3xl bg-white px-8 py-6">
                  <div className="flex w-full flex-row items-center justify-center">
                    <span className="block h-px w-[30%] bg-[#C5C5C5]"></span>
                    <span className="mx-4 inline-block font-semibold uppercase text-[#67BC47]">
                      sign in
                    </span>
                    <span className="block h-px w-[30%] bg-[#C5C5C5]"></span>
                  </div>
                  <div className="mt-8 flex w-full flex-col items-center gap-2">
                    <div className="relative mb-6 w-full">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="phone-input"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-12 text-xs text-gray-900"
                      />
                    </div>
                    <div className="relative mb-6 w-full">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="password"
                        id="password-input"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-12 text-xs text-gray-900"
                      />
                    </div>
                    {loginError && (
                      <div className="mb-4 text-red-500 text-xs">{loginError}</div>
                    )}
                    <Link
                      onClick={handleLogin}
                      className="relative rounded-lg bg-[#5DA646] px-16 py-3 text-xs font-light uppercase text-white"
                      to={"#"} // Change to "#" to prevent actual navigation
                    >
                      sign in
                      <div className="absolute right-2 top-1/4 block h-5 w-5 rounded-xl bg-[#79D45C]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="ml-[4px] mt-[4px] h-3 w-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </div>
                    </Link>
                    <a
                      href=""
                      className="mt-4 text-xs font-medium capitalize text-black hover:text-green-500"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
              ) : (
                <div className="relative flex h-full w-80 -translate-x-2/4 flex-col items-center rounded-3xl bg-white px-8 py-4">
                  <div className="flex w-full flex-row items-center justify-center">
                    <span className="block h-px w-1/3 bg-[#C5C5C5]"></span>
                    <span className="mx-4 font-semibold uppercase text-[#67BC47]">
                      welcome
                    </span>
                    <span className="block h-px w-1/3 bg-[#C5C5C5]"></span>
                  </div>
                  <div className="mt-20 flex flex-col gap-16">
                    <button
                      className="inline-block cursor-pointer rounded-2xl bg-[#67BC47] px-[4.7rem] py-2 text-center text-xs font-bold uppercase text-white shadow-md shadow-gray-400"
                      onClick={() => setIsSignIn(true)}
                    >
                      sign in
                    </button>
                    <button className="inline-block cursor-pointer rounded-2xl bg-[#67BC47] px-[4.7rem] py-2 text-center text-xs font-bold uppercase text-white shadow-md shadow-gray-400">
                      sign up
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
