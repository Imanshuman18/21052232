import './App.css';
import {useState,useEffect} from "react"
import axios from 'axios'
const accesstoken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1MTUxMTc0LCJpYXQiOjE3MTUxNTA4NzQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjA4NGIxZmY1LWE3MDUtNDRjNC1hNzE4LWQ4MGQzZWQwODA1NCIsInN1YiI6IjIxMDUyMjMyQGtpaXQuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJLYWxpbmdhIEluc3RpdHV0ZSBvZiBJbmR1c3RyaWFsIHRlY2hub2xvZ3kiLCJjbGllbnRJRCI6IjA4NGIxZmY1LWE3MDUtNDRjNC1hNzE4LWQ4MGQzZWQwODA1NCIsImNsaWVudFNlY3JldCI6InZ3WXFwRXBUS1poYWtNQm4iLCJvd25lck5hbWUiOiJBbnNodW1hbiIsIm93bmVyRW1haWwiOiIyMTA1MjIzMkBraWl0LmFjLmluIiwicm9sbE5vIjoiMjEwNTIyMzIifQ.JvKfUdA_LW3JV47tN_1pz11otGIhizV-5AP8xNzgVcg'
const url='http://20.244.56.144/test/companies/categories/products?top=10&minPrice=1000&maxPrice=10000'
const authaxios=axios.create({
  baseURL:url,
  headers:{
    Authorization:`Bearer ${accesstoken}`
  }
})
function App() {
  const [product, setproduct] = useState([])
  const [companyName, setCompanyName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [topN, setTopN] = useState(10);  
  const [minPrice, setMinPrice] = useState(0); 
  const [maxPrice, setMaxPrice] = useState(10000)
  
  const [error, setError] = useState('');

  const fetchProducts=async()=>{
    try {
      const result=await authaxios.get(`${url}`)
      //console.log(result)
      setproduct(result.data)
    } catch (error) {
      setError(error.message)
      
    }
  }
  useEffect(() => {
    if (companyName && categoryName) {
      fetchProducts();
    }
  }, [companyName, categoryName, topN, minPrice, maxPrice]);
  return (
    <div className="App">
      <h1>Fetch Top Products</h1>
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Enter company name"
      />
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Enter category name"
      />
      <input
        type="number"
        value={topN}
        onChange={(e) => setTopN(e.target.value)}
        placeholder="Top N products"
      />
      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Minimum price"
      />
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Maximum price"
      />
      <button onClick={fetchProducts}>Fetch Products</button>
      {product.length > 0 && (
        <div>
          <h2>Products:</h2>
          <ul>
            {product.map((product, key) => (
              <li key={key}>{product.Productname} - ${product.price},${product.rating},{product.discount},{product.avalaivility}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
