import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const apiHost = import.meta.env.VITE_APP_HOST;
  const apiUrl = apiHost+'/users/signup';

  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();


  async function userSignup(data){
        
  console.log("Form data:", data);

  if (!data.firstName || !data.lastName || !data.email || !data.password) {
    alert("Missing required fields.");
    return;
  }
  
   // Post data from API
  //  async function postData() {
       const response = await fetch(apiUrl, {
       method:'POST',
       headers: {
        'Content-Type': 'application/json',  // Specify JSON content type
      },
       body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password
        }),
       });

       if(response.ok) {
           navigate('/login');
           
       }else{
          const errorMsg = await response.json();

          if (errorMsg == 'User already exists') {
            alert('Email already in use.')
          }else if(errorMsg == 'Invalid password'){
            alert('Invalid password.')
          }else{
            alert('Failed to create user')
          }   
      // }
   }
   
  }


  return (
    <>
      <div className="text-center mt-5">
        <h1>Signup</h1>
      </div>
      <div className="d-flex justify-content-center mt-5" style={{ maxWidth: '600px', width: '100%'}}>
        <div className="form-group align-center"style={{ minWidth: '20vw', maxWidth: '30vw', width: '100%'}}>
          <form onSubmit={handleSubmit(userSignup)} method="post" className="w-100">
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input {...register("firstName", { required: true })} type="text" className="form-control bg-light" />
              {errors.firstName && <span className="text-danger">First Name is required.</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input {...register("lastName", { required: "Last Name is required." })} type="text" className="form-control bg-light" />
              {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input {...register("email", { required: "Email is required." })} type="text" className="form-control bg-light" />
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input {...register("password", { required: "Password is required." })} type="password" className="form-control bg-light" />
              {errors.password && <span className="text-danger">{errors.password.message}</span>}
            </div>
            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className="btn btn-primary" style={{ minWidth: '10vw', maxWidth: '20vw', width: '100%'}}>Signup</button>
            </div>
            
          </form>
        </div>
      </div>
    </>
  )
}