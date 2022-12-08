
import { useGetAllProductsQuery } from "./features/productApi";
// import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { addToCart } from "./features/carSlice";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
 const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  //Aysnc Thunk
  //  const {items, status} =  useSelector(state => state.products)

  //Async RTK Query
  const { data, error, isLoading } = useGetAllProductsQuery();
  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p> An error occured...</p>
      ) : (
        <>
          <h2> New Arrivals</h2>
          <div className="products">
            {data?.map((product) => (
              <div className="product" key={product.id}>
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} />
                <div className="details">
                  <p>{product.desc}</p>
                  <span className="price">${product.price}</span>
                </div>
                <button onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
