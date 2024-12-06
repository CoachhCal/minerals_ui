import { useForm } from "react-hook-form";
import { Link , useOutletContext} from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import {setIsLoggedIn} from "./App.js"

export default function Login() {
  const apiHost = import.meta.env.VITE_APP_HOST;
  const apiUrl = apiHost+'/users/login';
  const { isLoggedIn, setIsLoggedIn } = useOutletContext();
  const navigate = useNavigate();
 
  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loginFail, setLoginFail] = useState(false);

  // form submit function
  async function formSubmit(data) {
    

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      credentials: 'include' // make fetch include cookies in the request
    });

    if(response.ok){
      setIsLoggedIn(true);
      navigate('/'); 
    }
    else {
      window.alert("Login failed")
      setLoginFail(true);
    }
  }
  
  return (
    <>
      <div className="text-center mt-5">
        <h1>Login</h1>
      </div>
      <div className="d-flex justify-content-center mt-5" style={{ maxWidth: '600px', width: '100%'}}>
        <div className="form-group align-center"style={{ minWidth: '20vw', maxWidth: '30vw', width: '100%'}}>
          
          {loginFail && <p className="text-danger">Incorrect username or password.</p>}
          <form onSubmit={handleSubmit(formSubmit)} method="post" className="w-100">
            <div className="mb-3">
              <label className="form-label">Email (username)</label>
              <input {...register("email", { required: "Email is required." })} type="text" className="form-control bg-light" />
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input {...register("password", { required: "Password is required." })} type="password" className="form-control bg-light" />
              {errors.password && <span className="text-danger">{errors.password.message}</span>}
            </div>
            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className="btn btn-primary btn-lg" style={{ minWidth: '10vw', maxWidth: '20vw', width: '100%'}}>Login</button>
              
            </div>
          </form>
        </div>
      </div>
      <p className="mt-4 text-center">Don't have an account. <Link to="/signup">Sign-up</Link> now.</p>
    </>
  )
}