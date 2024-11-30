import { Link } from 'react-router-dom';

export default function ProductCard(props) {
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
                    
                    
                
                
                
            </div>
        </div>
    )
}