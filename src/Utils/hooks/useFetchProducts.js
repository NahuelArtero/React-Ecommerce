import { useEffect, useState } from "react";
import { getAllProducts } from "../../Services/productsService";

function useFetchProducts(){
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

  useEffect(
    () => {
      const request = async () => {
        try {
          const response = await getAllProducts(search)
          setProducts(response.docs)
          setLoading(false)
        } catch (err) {
          console.log(err)
        }
      }
      request()
    }, [search]
  );

  const handleSearch = (event) => {
    const value = event.target.value
    setSearch(value)
  }

  return{
    loading,
    products,
    search,
    handleSearch
  };
}
export default useFetchProducts;