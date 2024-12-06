import { Link} from "react-router-dom";

export default function Confirmation() {
    return (
      <>
      <div className="text-center mt-5">
        <h2>Purchase Confirmed</h2>
      </div>
      <div className="d-flex justify-content-center mt-5" style={{ maxWidth: '600px', width: '100%'}}>

      
        <div className = "d-flex justify-content-center align-items-center mt-3 mb-5 " >
        <Link to="/" className="btn btn-lg btn-secondary ">Continue Shopping</Link>
        </div>
      
      </div>
    </>
    );
  }