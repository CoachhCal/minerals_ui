
import { useState, useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Details(){
  const [mineral, setMineral] = useState(null); //intialize as empty array. we can latr only display it if the array is > 0
  const { id } = useParams();
  const apiHost = import.meta.env.VITE_APP_HOST;
  const apiUrl = apiHost+'/products/' + id;
  const [cookies, setCookie] = useCookies(['cart']);


  //get contacts from api

  useEffect(() => {
      // Fetch data from API
      async function fetchData() {
        const response = await fetch(apiUrl);
  
          if(response.ok) {
  
              const data = await response.json();
              if (!ignore) {
                
                  setMineral(data);
              }
          }else{
            
              setMineral(null);
          }
      }
  
      let ignore = false;
      fetchData();
      return () => {
         ignore = true;
      }
    }, []); //running only once


    function addToCart(cart){
      //add to cookie
      if(cookies.cart){ //if cart already exists, append to it
        setCookie('cart', cookies.cart+ ',' + cart, {maxAge: 3600 }); //1hr = 3600 seconds
        
      }
      else {
        setCookie('cart',cart, {maxAge: 3600}) //create new cart
        
      }
    }

  return (
    <>
    
    {
      mineral ? (
        
        <div className="row justify-content-center mt-5">
          
            <div className="card align-center"style={{ maxWidth: '50vw', width: '100%'}}>
              
                <img src={`${import.meta.env.VITE_APP_HOST}/images/${mineral.image_filename}`} className = "img-fluid mb-3"/>
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h1 className="">{`${mineral.name}`}</h1>
                    <br></br>
                    <h3 className="mb-2">{`Price: $${mineral.cost}`}</h3>
                    <p className="mb-2">{`${mineral.description}`}</p>
                    <br></br>
                        
                </div>
        
            </div>

            <div>
            {/* <a class="btn btn-primary" href="#" style={{width: "100px"}}role="button">Link</a> */}
            <div className ="text-center mt-5">
            <button onClick={()=>addToCart(`${mineral.product_id}`)} className="btn btn-lg btn-secondary me-5" style={{ width: '20vw'}}>Add to Cart</button>
                <Link to="/" className="btn btn-lg btn-secondary ms-5" style={{ width: '20vw'}}>Go Back</Link>
            </div>
            </div>
          
        </div>
        

        //<button type="button" class="btn btn-outline-primary">Primary</button>
       
      ) : 
      (
        <p>No Mineral</p>
      )
    }

    </>
  )
}