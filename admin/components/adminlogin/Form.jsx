"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { addAdminLoginAPI } from "../../api/adminlogin";
import { useRouter, useParams } from "next/navigation";
// import { toast } from 'react-toastify';
// import Modal from '../components/Modal';
// npm install react-toastify
import { toast, ToastContainer } from 'react-toastify';


const Form = () => {
  const router = useRouter();
  // const [showDialog, setShowDialog] = useState(false);
   const [user, setUser] = useState("");
   const [password, setPassword] = useState("");
      const [error, setError] = useState("");
      // useEffect(() => {
      //   alert("sjdz")
      //   toast.success("Login successful!");
      // }, []);
      const addAdminLogin = async (e) => {
          e.preventDefault();
         
      
          
      
          setError("");
          const formData = {
            "email": user,
            "password": password};
      
          try {
            const data = await addAdminLoginAPI(formData);
           
            setUser("");
            setPassword("");
            if (data.status=="success") {
              toast.success("Login successful!");
              // toast.success("Login successful!");
              localStorage.setItem("user", JSON.stringify(data.data));
              // alert(data.message);
              router.push("/cmsroboticlife/my-dashboard");
              const userData = JSON.parse(localStorage.getItem("user"));
              
            } else
            if (data.status=="fail") {
              const err = await res.json();
              throw new Error(err.message || "Login failed");
            }
        
           
          } catch (error) {
            setError(error.message);
          }
        };
  return (
    <form  onSubmit={addAdminLogin}  >
      <div className="heading text-center">
        <h3>Login to CMS dashboard</h3>
        {/* <p className="text-center">
          Dont have an account?{" "}
          <Link href="/register" className="text-thm">
            Sign Up!
          </Link>
        </p> */}
      </div>
      {/* End .heading */}

      <div className="input-group mb-2 mr-sm-2">
        <input
          type="text"
          className="form-control"
          required
          placeholder="User Name Or Email"  value={user} onChange={(e) => setUser(e.target.value)} 
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div>
      {/* End .input-group */}

      <div className="input-group form-group">
        <input
          type="password"
          className="form-control"
          required
          placeholder="Password"   value={password} onChange={(e) => setPassword(e.target.value)} 
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>
      {/* End .input-group */}

      <div className="form-group form-check custom-checkbox mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="remeberMe"
        />
        <label
          className="form-check-label form-check-label"
          htmlFor="remeberMe"
        >
          Remember me
        </label>

        <a className="btn-fpswd float-end" href="#">
          Forgot password?
        </a>
      </div>
      {/* End .form-group */}

      <button type="submit" className="btn btn-log w-100 btn-thm">
        Log In
      </button>
      <ToastContainer />
     
      {/* login button */}

      {/* <div className="divide">
        <span className="lf_divider">Or</span>
        <hr />
      </div> */}
      {/* devider */}

      {/* <div className="row mt25">
        <div className="col-lg-6">
          <button
            type="submit"
            className="btn btn-block color-white bgc-fb mb0 w-100"
          >
            <i className="fa fa-facebook float-start mt5"></i> Facebook
          </button>
        </div>*/}
        {/* End .col */}

        {/* <div className="col-lg-6">
          <button
            type="submit"
            className="btn btn2 btn-block color-white bgc-gogle mb0 w-100"
          >
            <i className="fa fa-google float-start mt5"></i> Google
          </button>
        </div> */}
        {/* End .col */}
     {/* </div> */}
      {/* more signin options */}
    </form>
  );
};

export default Form;
