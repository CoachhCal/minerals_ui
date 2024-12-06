import { useForm } from "react-hook-form";
import { useCookies } from 'react-cookie';
import { Link, useOutletContext} from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const apiHost = import.meta.env.VITE_APP_HOST;
  const apiUrl = apiHost+'/products/purchase';
  const { isLoggedIn, setIsLoggedIn } = useOutletContext();
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);

  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  
  async function userCheckout(data){

  if (!data.street || !data.city || !data.province || !data.country || !data.postalCode || !data.creditCard || !data.creditExpire || !data.creditCvv) {
    alert("Missing required fields.");
    return;
  }
  
  const cartData = cookies.cart || '';
       const response = await fetch(apiUrl, {
       method:'POST',
       headers: {
        'Content-Type': 'application/json',  // Specify JSON content type
      },
       body: JSON.stringify({
          street: data.street,
          city: data.city,
          province: data.province,
          country: data.country,
          postal_code: data.postalCode,
          credit_card: data.creditCard,
          credit_expire: data.creditExpire,
          credit_cvv: data.creditCvv,
          cart: cartData
        }),
        credentials: 'include',
       });

       if(response.ok) {
        removeCookie('cart', { path: '/' });
        navigate('/confirmation');
           
       }else{
          alert('Failed to proceed')    
   }
  }

  return (
    <>
      <div className="text-center mt-5">
        <h1>Checkout</h1>
      </div>
      <div className="d-flex justify-content-center mt-5" style={{ maxWidth: '600px', width: '100%'}}>

      {!isLoggedIn ?(
        <div className = "d-flex justify-content-center align-items-center mt-3 mb-5 " >
        <Link to="/login" className="btn btn-lg btn-secondary ">Login</Link>
        </div>
      ):(

        <div className="form-group align-center"style={{ minWidth: '20vw', maxWidth: '30vw', width: '100%'}}>
          <form onSubmit={handleSubmit(userCheckout)} method="post" className="w-100">
            <div className="mb-3">
              <label className="form-label">Street</label>
              <input {...register("street", { required: true })} type="text" className="form-control bg-light" />
              {errors.street && <span className="text-danger">Street is required.</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input {...register("city", { required: "City is required." })} type="text" className="form-control bg-light" />
              {errors.city && <span className="text-danger">{errors.city.message}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Province</label>
              <input {...register("province", { required: "Province required." })} type="text" className="form-control bg-light" />
              {errors.province && <span className="text-danger">{errors.province.message}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Country</label>
              <input {...register("country", { required: "Country is required." })} type="text" className="form-control bg-light" />
              {errors.country && <span className="text-danger">{errors.country.message}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Postal Code</label>
              <input {...register("postalCode", { required: "Postal Code is required." })} type="text" className="form-control bg-light" />
              {errors.postalCode && <span className="text-danger">{errors.postalCode.message}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input {...register("creditCard", { required: "Card number is required." })} type="text" className="form-control bg-light" />
              {errors.creditCard && <span className="text-danger">{errors.creditCard.message}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Expiry</label>
              <input {...register("creditExpire", { required: "Expiry date is required." })} type="text" className="form-control bg-light" />
              {errors.creditExpire && <span className="text-danger">{errors.creditExpire.message}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">CVV</label>
              <input {...register("creditCvv", { required: "CVV is required." })} type="text" className="form-control bg-light" />
              {errors.creditCvv && <span className="text-danger">{errors.creditCvv.message}</span>}
            </div>
            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className="btn btn-primary" style={{ minWidth: '10vw', maxWidth: '20vw', width: '100%'}}>Next</button>
            </div>
            
          </form>
        </div>
      )}
      </div>
    </>
  )
}