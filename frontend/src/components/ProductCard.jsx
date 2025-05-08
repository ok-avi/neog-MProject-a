import { Link } from "react-router-dom"
import { useState } from "react"

import men from "../assets/men.jpg"
import women from "../assets/women.jpg"
import child from "../assets/child.jpg"

const ProductCard = ({product,productCategory}) => {
  const [wishlistStatus,setWishlistStatus] = useState(false)
  function addToWishlist(productId){
    fetch(`https://neog-m-project-a-backend.vercel.app/api/user/add/wishlist`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        "userId":"680f3af1781afdac18e50245",
        "wishlistId": productId
      })
    })
    .then(response=>response.json())
    .then((data)=>{
      setWishlistStatus(true)
      // console.log(data)
    })
    .catch(error=>console.log(error))
    console.log("wishlist")
  }
  let imgSrc
  if(productCategory==="men"){
    imgSrc=men
    console.log("men")
  } else if(productCategory==="women"){imgSrc=women}
  else if(productCategory==="children"){imgSrc=child}
  // console.log("nav",productCategory)
  return (
    <div className=" mb-3 col-sm-6 col-lg-4 position-relative" key={product._id} >
        <Link className="card nav-link" to={`/product/${product._id}`} >
          <div className="card-body">
          <div className="">
            <img 
            src={imgSrc}
            className="card-img-top" alt="..."/>


          </div>
            <p className="card-text">{product.name} </p>
            <h5 className="card-title my-2">&#8377;
            {product.price}</h5>
            <div className="d-flex align-items-center justify-content-between">
              <div><strong>Rating:</strong> {product.rating}</div>
              {wishlistStatus&&<span className="float-end btn btn-success">Added</span>}
            </div>
          </div>
        </Link>
        <button onClick={()=>addToWishlist(product._id)} className={`bg-white btn btn-outline-light position-absolute mt-2 me-2 top-0 end-0 d-inline   badge `} href="/">
          <img className={``}  width="35" height="40" src="https://img.icons8.com/ios/50/hearts--v2.png" alt="hearts--v1"/>
        </button>
             
    </div>
  )
}

export default ProductCard