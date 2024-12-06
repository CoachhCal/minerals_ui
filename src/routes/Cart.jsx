import { useCookies } from "react-cookie";
import { useState, useEffect } from 'react';
import ProductCard from '../ui/ProductCard';
import { useParams, Link} from 'react-router-dom';

export default function Cart() {

  const [cookies] = useCookies(['cart']);
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState([]);
  const [quantityArray, setQuantityArray] = useState([]);
  const [minerals, setMinerals] = useState([]); 
  const apiHost = import.meta.env.VITE_APP_HOST;
  const apiUrl = apiHost+'/products/all';

  useEffect(() => {
    
    if (cookies.cart) {
      let cartArray = cookies.cart;
      
      // Ensure it's a string and split it into an array
      if (typeof cartArray !== "string") {
        cartArray = cartArray.toString(); // Convert to string if it's not
      }

      // Split by commas to get the product IDs
      const itemsArray = cartArray.split(',').filter(Boolean); // Filter removes empty strings
      setCartItems(itemsArray); 
    }
  }, [cookies]);

  useEffect(() => {
    // Fetch data from API
    async function fetchData() {
      const response = await fetch(apiUrl);

        if(response.ok) {

            const data = await response.json();
            if (!ignore) {

              let indexedArray = [];
              let tempQuantityArray = []
              let quant = 0;
              let products = []
          
              for(let outerLoop = 0; outerLoop<cartItems.length; outerLoop++){ //sort through cart to get the quantity of each id, and the unique id's
          
                  for(let innerLoop = 0;innerLoop<cartItems.length; innerLoop++){
          
                      if(indexedArray.indexOf(cartItems[outerLoop])!=-1){ 
                          break;
                      }
                      if(cartItems[innerLoop] == cartItems[outerLoop]){ 
                          quant+=1;
                      }
                      if(innerLoop == cartItems.length-1){ 
                          tempQuantityArray.push(quant)
                          // products.push()
                          indexedArray.push(cartItems[outerLoop]) 
                          quant = 0;
                      }
                    
                  }
              }

              products = data.filter((data)=>  // filter through all mineral to only get the ones in the cart
                {
                  for(let i = 0; i < indexedArray.length; i++){ //indexed array contains only product id's in cart
                    if(data.product_id == indexedArray[i]){
                      return data
                    }
                  }
                }
              )

              let subTotal = 0 
              for(let i=0; i<products.length;i++){ //find subtotal
                subTotal += products[i].cost * tempQuantityArray[i]
              }
             
              setSubTotal(subTotal)
              setMinerals(products);
              setQuantityArray(tempQuantityArray);
            }
        }else{
          
            setMinerals(null);
        }
    }

    let ignore = false;
    fetchData();
    return () => {
       ignore = true;
    }
  }, [cartItems, cookies]);

  return (
    <>
    
    {
      minerals.length > 0 ? (
        <div className="row d-flex justify-content-center align-items-center mt-5">
          {minerals.map((mineral, index) => (
            
            <div className="col-3 car m-3" key={index}>
              {/* <div className="card m-3"> */}
                <ProductCard mineral={mineral} apiHost={apiHost} quantity = {quantityArray[index]} setCartItems={setCartItems}/>
              {/* </div> */}
            </div>
          ))}
        </div>
      ) : 
      (
        <p></p>
      )
    }

    {
      <div>
        <div className = "d-flex justify-content-center align-items-center mt-5 border border-dark p-3 rounded shadow-lg mx-auto" style={{ width: '50vw' }}>
        
        <div>
        <h3>Sub-Total: ${(parseFloat(subTotal) || 0).toFixed(2)}</h3>
        <h3>Tax: ${(parseFloat(subTotal * 0.15) || 0).toFixed(2)}</h3>
        <h3>Total: ${(parseFloat(subTotal * 1.15) || 0).toFixed(2)}</h3>
        </div>

        <Link to="/checkout" className="btn btn-lg btn-secondary ms-5" style={{ width: '20vw'}}>Complete Purchase</Link>
        </div>

        <div className = "d-flex justify-content-center align-items-center mt-3">
          <h3>OR</h3>
        </div>

        <div className = "d-flex justify-content-center align-items-center mt-3 mb-5 " >
        <Link to="/" className="btn btn-lg btn-secondary ">Continue Shopping</Link>
        </div>
        
        <hr></hr>
        <br></br>
      </div>
      
    }

    </>
  )

}