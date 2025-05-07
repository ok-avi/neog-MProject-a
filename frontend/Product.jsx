import { Link, useParams } from "react-router-dom"
import Nav from "./src/components/Nav"
import { useEffect, useState } from "react"
import ProductCard from "./src/components/ProductCard"
import useFetch from "./useFetch"

const data =  {
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
      size: ["M", "L"],
      description: "A very stylish t-shirt perfect for summer."
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
      size: ["S", "M", "XL"],
      description: "An elegant dress perfect for evening parties."
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
      size: ["M", "XL"],
      description: "Comfortable and stylish blue jeans for everyday wear."
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
      size: ["M", "XL"],
      description: "Comfortable and stylish blue jeans for everyday wear."
    }
  ]
};

const Product = () => {
    const {productCategory} = useParams()
    const [filter,setFilter] = useState({
      price:"all",
      category:"all",
      rating:"all",
      sortBy:"all"
    })
    // const { data, loading, error } = useFetch(`http://localhost:3000/api/products/category/${productCategory}`)
    
    const [updatedProducts,setUpdatedProducts] = useState(undefined) 
    let filteredProducts 
    if(data){
      filteredProducts=data.products
    }
    function filterByPrice(productsArray,price){
      return productsArray.filter(product=>product.price<filter.price)
      // return productsArray.filter(product=>product.price<price)
    }
    function filterByRatings(productsArray){
      return productsArray.filter(product=>product.rating>filter.rating)
    } 
    function filterSortingAscending(productsArray){
      return productsArray.sort((a,b)=>a.price-b.price)
    }
    function filterSortingDescending(productsArray){
      return productsArray.sort((a,b)=>a.price-b.price).reverse()
    }
    
    useEffect(() => {
      if(data){
        if(filter.price!=="all" && filter.rating!=="all"){
          filteredProducts = filterByPrice(data.products)
          filteredProducts = filterByRatings(filteredProducts)
          setUpdatedProducts(prev=>(filteredProducts))
          return
        }
        if(filter.price!=="all"&&filter.sortBy!=="all"){
          filteredProducts = filterByPrice(data.products)
          if(filter.sortBy==="lowToHigh"){
            filteredProducts = filterSortingAscending(filteredProducts)
          } else{
            filteredProducts = filterSortingDescending(filteredProducts)
          }
          console.log("worked",filter.sortBy)
          setUpdatedProducts(prev=>(filteredProducts))
          return
        }

        if(filter.price!=="all"){
          filteredProducts = filterByPrice(data.products)
          setUpdatedProducts(prev=>(filteredProducts))
          return
        }
        // console.log(filter.price)
        if(filter.rating!=="all"){
          filteredProducts = filterByRatings(data.products)
          setUpdatedProducts(prev=>(filteredProducts))
        }
        if(filter.sortBy!=="all"){
          if(filter.sortBy==="lowToHigh"){
            console.log("sort ",filter.sortBy)
            filteredProducts = filterSortingAscending(data.products)
            setUpdatedProducts((filteredProducts))
            return
          }  
          if(filter.sortBy==="highToLow"){
            console.log("sort ",filter.sortBy)
            filteredProducts = filterSortingDescending(data.products)
            setUpdatedProducts((filteredProducts))
            return
          }
        }
        // console.log("effect",data.products,filter.price,filteredProducts)    
      }
    }, [filter,filter.sortBy,filter.price,filter.rating]);
    
    function priceHandler(e){
      setFilter(prev=>({...prev,price:e.target.value}))
    }
    function ratingsHandler(e){
      setFilter(prev=>({...prev,rating:e.target.value}))
      // console.log(e.target.value,filter)
    }
    function sortHandler(e){
      // console.log(e.target.value)
      setFilter(prev=>({...prev,sortBy:e.target.value}))
    }
    function categoryHandler(e){
      if(e.target.value){
        setFilter(prev=>({...prev,category:[e.target.value]}))
        // console.log(e.target.value)
      }
    }
    function clearFilter(){
      setFilter({
        price:"all",
        category:"all",
        rating:"all",
        sortBy:"all"
      })
    }
  return (
    <div className="bg-dark-subtle">
        <Nav/>
        <main className="row  py-4 mx-1">
            <div className="col-lg-3 bg-white mx-2 px-0 py-3" style={{height:"100%"}}>
                <div className="px-3 d-flex align-items-center justify-content-between">
                    <h3 className="">Filter</h3>
                    <button onClick={clearFilter} className="btn text-decoration-underline"><h5>Clear</h5></button>

                </div>
                <hr />
                <div className="px-3 mb-3">
                  <h4>Price</h4>
                  <div>
                    <input onChange={priceHandler} value={100} className="mx-2" type="radio" name="price" id="under100" />
                    <label className="mx-3" htmlFor="under100">Under 100</label>
                  </div>
                  <div>
                    <input onChange={priceHandler} value={200} className="mx-2" type="radio" name="price" id="under200" />
                    <label className="mx-3" htmlFor="under200">Under 200</label>
                  </div>
                  <div>
                    <input onChange={priceHandler} value={500} className="mx-2" type="radio" name="price" id="under500" />
                    <label className="mx-3" htmlFor="under500">Under 500</label>
                  </div>
                </div>
                <div className="px-3 mb-3">
                   <h4>Category</h4> 
                   <div className="">
                    <input onChange={categoryHandler} value={"tshirt"} className="mx-2" type="checkbox" name="category" id="tshirt" />
                    <label className="mx-3" htmlFor="tshirt">
                     T-shirt's
                    </label>

                   </div>
                   <div>
                     <input onChange={categoryHandler} value={"shirt"} className="mx-2" type="checkbox" name="category" id="shirt" />
                    <label className="mx-3" htmlFor="shirt">
                     Shirt
                    </label>
                   </div>
                </div>
                <div className="px-3 mb-3">
                  <h4>Ratings</h4>
                  <div>
                    <input onChange={ratingsHandler} value={4} className="mx-2" type="radio" name="rating" id="fourStar" />
                    <label className="mx-3" htmlFor="fourStar">4 stars & above</label>
                  </div>
                  <div>
                    <input onChange={ratingsHandler} value={3} className="mx-2" type="radio" name="rating" id="threeStar" />
                    <label className="mx-3" htmlFor="threeStar">3 stars & above</label>
                  </div>
                  <div>
                    <input onChange={ratingsHandler} value={2} className="mx-2" type="radio" name="rating" id="twoStar" />
                    <label className="mx-3" htmlFor="twoStar">2 stars & above</label>
                  </div>
                  <div>
                    <input onChange={ratingsHandler} value={1} className="mx-2" type="radio" name="rating" id="oneStar" />
                    <label className="mx-3" htmlFor="oneStar">1 stars & above</label>
                  </div>
                </div>
                <div className="px-3 mb-3">
                  <h4>Sort by</h4>
                  <div>
                    <input onChange={sortHandler} value={"lowToHigh"} className="mx-2" type="radio" name="sort" id="lowToHigh" />
                    <label className="mx-3" htmlFor="lowToHigh">Price - Low to High</label>
                  </div>
                  <div>
                    <input onChange={sortHandler} value={"highToLow"} className="mx-2" type="radio" name="sort" id="highToLow" />
                    <label className="mx-3" htmlFor="highToLow">Price - High to Low</label>
                  </div>
                </div>
            </div>
            <div className="col bg-white mx-2  py-3 ">
              <h3 className="mb-4">Showing All Products</h3>
              {/* <ProductCard /> */}
              <div className="row">
                {/* {data&&
                filteredProducts.map(product=>(
                  <ProductCard product={product} />
                ))} */}
                
                {/* {updatedProducts&&updatedProducts.map(product=><div>{product.name}</div>)} */}
                {data&&updatedProducts?updatedProducts.map(product=><ProductCard product={product} />):(
                  filteredProducts&&filteredProducts.map(product=>(
                    <ProductCard product={product} />
                  ))
                )}
              </div>
            </div>
        </main>
    </div>
  )
}

export default Product