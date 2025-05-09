import { Link, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import useFetch from "../../useFetch";
/*
const data = {
  products: [
    {
      quantity: 1,
      _id: "680f1734781afdac18e5023b",
      name: "Cool T-Shirt",
      title: "Stylish Summer T-Shirt",
      image: "https://example.com/tshirt.jpg",
      price: 499,
      rating: 4.5,
      numberOfRatings: 150,
      category: "Men",
      upperwear:"tshirt",
      size: ["M", "L"],
      description: "A very stylish t-shirt perfect for summer.",
    },
    {
      quantity: 1,
      _id: "680f1eaa781afdac18e5023d",
      name: "Elegant Dress",
      title: "Evening Party Dress",
      image: "https://example.com/dress.jpg",
      price: 1299,
      rating: 4.8,
      numberOfRatings: 250,
      category: "Women",
      upperwear:"tshirt",
      size: ["S", "M", "XL"],
      description: "An elegant dress perfect for evening parties.",
    },
    {
      quantity: 1,
      _id: "680f4454781afdac18e50261",
      name: "Classic Jeans",
      title: "Regular Fit Blue Jeans",
      image: "https://example.com/jeans.jpg",
      price: 899,
      rating: 4.2,
      numberOfRatings: 200,
      category: "Men",
      upperwear:"shirt",
      size: ["M", "XL"],
      description: "Comfortable and stylish blue jeans for everyday wear.",
    },
    {
      _id: "6815bd3897a2beb00bbf630c",
      quantity: 1,
      name: "Stylish Jeans",
      title: "Comfortable new era Jeans",
      image: "https://example.com/jeans.jpg",
      price: 200,
      rating: 2.2,
      numberOfRatings: 200,
      category: "Men",
      upperwear:"tshirt",
      size: ["M", "XL"],
      description: "Comfortable and stylish blue jeans for everyday wear.",
    },
  ],
};
*/
const Product = () => {
  const { productCategory } = useParams();
  const [filter, setFilter] = useState({
    price: "all",
    // category: "all", // will be converted to array later
    category: [], // will be converted to array later
    rating: "all",
    sortBy: "all",
  });

  
  const [inputSearch,setInputSearch] = useState()

  const { data, loading, error } = useFetch(`https://neog-m-project-a-backend.vercel.app/api/products/category/${productCategory}`)
  // data&&console.log(data)
  const [updatedProducts, setUpdatedProducts] = useState(undefined);
  let filteredProducts;
  if (data) {
    filteredProducts = data.products;
  }

  // this i changed so check it once
  useEffect(() => {
    if (!data) return;

    let filtered = [...data.products];

    if (filter.price !== "all") {
      filtered = filtered.filter(
        (product) => product.price < parseInt(filter.price)
      );
    }

    if (filter.rating !== "all") {
      filtered = filtered.filter(
        (product) => product.rating >= parseFloat(filter.rating)
      );
    }

    if (filter.category.length>0) {
      filtered = filtered.filter((product) =>
        filter.category.includes(product.upperwear.toLowerCase())
      );
    }


    if (filter.sortBy === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filter.sortBy === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setUpdatedProducts(filtered);
  }, [filter]);


  function priceHandler(e) {
    setFilter((prev) => ({ ...prev, price: e.target.value }));
  }
  function ratingsHandler(e) {
    setFilter((prev) => ({ ...prev, rating: e.target.value }));
    // console.log(e.target.value,filter)
  }
  function sortHandler(e) {
    // console.log(e.target.value)
    setFilter((prev) => ({ ...prev, sortBy: e.target.value }));
  }

  function categoryHandler(e) {
    if (e.target.checked) {
      // console.log(e.target.value,"worked")
      setFilter(prev=>({...prev,category:[...prev.category,e.target.value]}))
    } 
    else{
      setFilter(prev=>({...prev,category:prev.category.filter(category=>category!==e.target.value)}))
    }
  }

  function searchHandler(e){
    e.preventDefault()
    // console.log("worked search",inputSearch)
  }

  function clearFilterBtn(){
    setFilter(prev=>({
      ...prev,
      price:"all",
      category:[],
      rating:"all",
      sortBy:"all",
    }))
    document.forms["myForm"].reset();
    console.log("clear filter")
  }
  function formHandler(e){
    e.preventDefault()
  }
  return (
    <div className="bg-dark-subtle ">
      <Nav searchHandler={searchHandler} inputSearch={inputSearch} setInputSearch={setInputSearch} />
      <main className="row  py-4 mx-1 ">

        <div
          className="col-lg-3 bg-white mx-2 px-0 py-3"
          style={{ height: "100%" }}
        >
          <form onSubmit={formHandler} name="myForm">
          <div className="px-3 d-flex align-items-center justify-content-between">
            <h3 className="">Filter {filter.price}</h3>
            <button
              className="btn text-decoration-underline"
              onClick={clearFilterBtn}
            >
              <h5>Clear</h5>
            </button>
          </div>
          <hr />
          <div className="px-3 mb-3">
            <h4>Price</h4>
            <div>
              <input
                onChange={priceHandler}
                value={100}
                className="mx-2"
                type="radio"
                name="price"
                id="under100"
              />
              <label className="mx-3" htmlFor="under100">
                Under 100
              </label>
            </div>
            <div>
              <input
                onChange={priceHandler}
                value={200}
                className="mx-2"
                type="radio"
                name="price"
                id="under200"
              />
              <label className="mx-3" htmlFor="under200">
                Under 200
              </label>
            </div>
            <div>
              <input
                onChange={priceHandler}
                value={500}
                className="mx-2"
                type="radio"
                name="price"
                id="under500"
              />
              <label className="mx-3" htmlFor="under500">
                Under 500
              </label>
            </div>
          </div>
          <div className="px-3 mb-3">
            <h4>Category</h4>
            <div className="">
              <input
                onChange={categoryHandler}
                value={"tshirt"}
                className="mx-2"
                type="checkbox"
                name="category"
                id="tshirt"
              />
              <label className="mx-3" htmlFor="tshirt">
                T-shirt's
              </label>
            </div>
            <div>
              <input
                onChange={categoryHandler}
                value={"shirt"}
                className="mx-2"
                type="checkbox"
                name="category"
                id="shirt"
              />
              <label className="mx-3" htmlFor="shirt">
                Shirt
              </label>
            </div>
          </div>
          <div className="px-3 mb-3">
            <h4>Ratings</h4>
            <div>
              <input
                onChange={ratingsHandler}
                value={4}
                className="mx-2"
                type="radio"
                name="rating"
                id="fourStar"
              />
              <label className="mx-3" htmlFor="fourStar">
                4 stars & above
              </label>
            </div>
            <div>
              <input
                onChange={ratingsHandler}
                value={3}
                className="mx-2"
                type="radio"
                name="rating"
                id="threeStar"
              />
              <label className="mx-3" htmlFor="threeStar">
                3 stars & above
              </label>
            </div>
            <div>
              <input
                onChange={ratingsHandler}
                value={2}
                className="mx-2"
                type="radio"
                name="rating"
                id="twoStar"
              />
              <label className="mx-3" htmlFor="twoStar">
                2 stars & above
              </label>
            </div>
            <div>
              <input
                onChange={ratingsHandler}
                value={1}
                className="mx-2"
                type="radio"
                name="rating"
                id="oneStar"
              />
              <label className="mx-3" htmlFor="oneStar">
                1 stars & above
              </label>
            </div>
          </div>
          <div className="px-3 mb-3">
            <h4>Sort by</h4>
            <div>
              <input
                onChange={sortHandler}
                value={"lowToHigh"}
                className="mx-2"
                type="radio"
                name="sort"
                id="lowToHigh"
              />
              <label className="mx-3" htmlFor="lowToHigh">
                Price - Low to High
              </label>
            </div>
            <div>
              <input
                onChange={sortHandler}
                value={"highToLow"}
                className="mx-2"
                type="radio"
                name="sort"
                id="highToLow"
              />
              <label className="mx-3" htmlFor="highToLow">
                Price - High to Low
              </label>
            </div>
          </div>
          </form>
        </div>
        <div className="col bg-white mx-2  py-3 ">
          <div >
            <h3 className="mb-4">Showing All Products</h3>
            {loading&&<div className="fs-2 text-warning text-center">Loading...</div>}

          </div>
          {/* <ProductCard /> */}
          <div className="row">
            {data && updatedProducts
              ? updatedProducts.map((product) => (
                  <ProductCard product={product} productCategory={productCategory} key={product._id} />
                ))
              : filteredProducts &&
                filteredProducts.map((product) => (
                  <ProductCard product={product} productCategory={productCategory} key={product._id} />
                ))}
          </div>
        </div>
      </main>

    </div>
  );
};

export default Product;
