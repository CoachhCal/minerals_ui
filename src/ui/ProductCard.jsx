import { useCookies } from "react-cookie";

export default function ProductCard(props) {

    const [cookies, setCookie, removeCookie] = useCookies(['cart']);

    function removeQuant() {
        let productIndex;
        let cartArray;

        if (cookies.cart) {
            // Get the current cart and split it into an array
            if(typeof cookies.cart == "number"){
                cartArray = ""
                productIndex = cartArray.indexOf(props.mineral.product_id.toString());
                
                
                removeCookie('cart', { path: '/' });
                props.setCartItems([]);
            }else{
            cartArray = cookies.cart.split(',');
           

            // index of the product to remove
            productIndex = cartArray.indexOf(props.mineral.product_id.toString());
            }

            // If the product exists in the cart
            if (productIndex !== -1) {
                // Remove the first occurrence of the product ID
                cartArray.splice(productIndex, 1);

                // Update the cart in cookies
                if (cartArray.length > 0) {
                    // If there are still products left, update the cart with the remaining items
                    setCookie('cart', cartArray.join(','), { path: '/' });
                } else {
                    // If the cart is empty, remove the cart cookie entirely
                    removeCookie('cart', { path: '/' });
                    props.setCartItems([]);
                }
            }
        }
    }

    return(
        <div className="card">
            {/* style={{height: 41 +'rem'}} */}
            <img src={`${import.meta.env.VITE_APP_HOST}/images/${props.mineral.image_filename}`}/>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h3 className="card-title">{`${props.mineral.name}`}</h3>
                <br></br>
                <h5 className="card-text mb-2">{`Price: $${props.mineral.cost}`}</h5>
                <h5 className="card-text mb-2">{`Quantity: ${props.quantity}`}</h5>
                <h5 className="card-text mb-2">{`Total: $${Number(props.quantity) * props.mineral.cost}`}</h5>
                <button type = "button" onClick={removeQuant} className="btn btn-secondary">Remove 1</button>
                    
                
                
                
            </div>
        </div>
    )
}