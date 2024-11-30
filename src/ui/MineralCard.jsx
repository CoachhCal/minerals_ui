import { Link } from 'react-router-dom';

export default function MineralCard(props) {
    return(
        <div className="card">
            {/* style={{height: 41 +'rem'}} */}
            <img src={`${import.meta.env.VITE_APP_HOST}/images/${props.mineral.image_filename}`}/>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h3 className="card-title">{`${props.mineral.name}`}</h3>
                <h5 className="card-text mb-2">{`Price: $${props.mineral.cost}`}</h5>
                    <Link to={`details/${props.mineral.product_id}`} className="text-decoration-none text-primary">
                        ...see more
                    </Link>
                    
                
                
                
            </div>
        </div>
    )
}