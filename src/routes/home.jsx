import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MineralCard from '../ui/MineralCard';

export default function Home(){
  const [minerals, setMinerals] = useState([]); //intialize as empty array. we can latr only display it if the array is > 0
  const apiHost = import.meta.env.VITE_APP_HOST;
  const apiUrl = apiHost+'/products/all';


  //get contacts from api

  useEffect(() => {
      // Fetch data from API
      async function fetchData() {
        const response = await fetch(apiUrl);
  
          if(response.ok) {
  
              const data = await response.json();
              if (!ignore) {
                console.log(data)
                
                  setMinerals(data);
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
    }, []); //running only once


  return (
    <>
    
    {
      minerals.length > 0 ? (
        <div className="row d-flex justify-content-center align-items-center mt-5">
          {minerals.map((mineral, index) => (
            
            <div className="col-3 car m-3" key={index}>
              {/* <div className="card m-3"> */}
                <MineralCard mineral={mineral} apiHost={apiHost}/>
              {/* </div> */}
            </div>
          ))}
        </div>
      ) : 
      (
        <p>No Contacts</p>
      )
    }

    </>
  )
}