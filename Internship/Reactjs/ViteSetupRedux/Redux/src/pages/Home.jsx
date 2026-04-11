import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";



const Home = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  return (
    <div className="home-container d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Content */}
          <div className="col-md-6">
            <h1 className="home-title">
              Build Something <span className="text-danger">Amazing</span>
            </h1>

            <h1 className="home-title">
              Welcome to my app.
            </h1>

            <p className="home-subtitle">
              A clean and modern React app with beautiful UI and smooth experience.
            </p>

            {token ? (
              <button
                className="btn btn-danger mt-3 px-4"
                onClick={() => navigate("/dashboard")}
              >
                DashBoard
              </button>
            ) : (
              <button
                className="btn btn-danger mt-3 px-4"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}


          </div>

          {/* Right Side (Visual Space) */}
          {/* <div className="col-md-6 text-center">
            <div className="home-box"></div>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default Home;