import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [loggedInUser,setLoggedInUser]=useState('');
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])
  const navigate = useNavigate();
  const handleLogOut=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate('/auth');
    }, 1000);

   
  }
  const fetchProducts=async()=>{
    try {
      const url="http://localhost:3000/api/product";
      const headers={
        headers: {
          'Authorization':localStorage.getItem('token')
        }
      };
      const response=await fetch(url,headers);
      const result=await response.json();
      setProducts(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchProducts();
  },[])


  return (
    <div>
      <h1>In Home component</h1>
      <h1>User name: {loggedInUser}</h1>
      <button onClick={()=>{handleLogOut()}} className="w-full bg-purple-600 text-white py-2 rounded mt-2">Logout</button>
    
      <div>
        {products.length > 0 ? (
          products.map((item) => (
            <ul key={item.id}>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

    </div>
  )
}

export default Home
