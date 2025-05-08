import { useState } from "react"
import Nav from "../components/Nav"
import men from "../assets/men.jpg"
import { useParams } from "react-router-dom"
import useFetch from "../../useFetch"


const src= "https://plus.unsplash.com/premium_photo-1684179641331-e89c6320b6a9?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const ProductDetails = () => {
  const [quantity,setQuantity] = useState(1)
  const {productId} = useParams()
  const [cartStatus,setCartStatus] = useState(false)
  const { data, loading, error } =  useFetch(`https://neog-m-project-a-backend.vercel.app/api/products/${productId}`)
  console.log(typeof productId,productId)

  function addToCart(productId){
    console.log("worked",productId)
    fetch(`https://neog-m-project-a-backend.vercel.app/api/user/add/cart`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        userId:"680f3af1781afdac18e50245",
        cartId:productId
      })
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data){
        setCartStatus(true)
      }
    })
    .catch((error)=>console.log(error))
  }

  // data&&console.log(data.product)
  function increaseQuantity(){}
  function decreaseQuantity(){}
  return (
    <div className="bg-secondary-subtle" style={{minHeight:"100vh"}}>
      
      <Nav />
      {loading&&<div className="fs-2 text-success text-center position-absolute top-50 start-50">Loading...</div>}
      {data&&<>
      <main className="row  py-4  mx-auto container " style={{minHeight:"90vh"}}>

        <div className="mb-3 col-sm-12 col-lg p-3 me-lg-3 bg-white " style={{height:"100%"}}>
          <div>
            <img src={men} style={{minHeight:"450px"}} className="w-100 " alt="" />
          </div>
          <div className="row ">
            <button onClick={()=>addToCart(productId)} className="col py-3 rounded-0  mx-2 my-3 btn btn-warning text-light fw-medium fs-5">{cartStatus?"Add to Cart":"Added to cart"}</button>
            <button className="col py-3 rounded-0  mx-2 my-3 btn btn-danger fw-medium fs-5">Buy Now</button>
          </div>
        </div>
        <div className="mb-3 col-sm-12 col-lg ms-lg-3 bg-white py-3 px-4">
          <p className="fs-4 ">{data.product.title} | {data.product.name}  </p>
          <div className="d-flex align-items-center">
            <p className="me-3 bg-success fw-medium  rounded text-light px-3"> {data&&data.product.rating}</p>
            <p className="fw-medium text-secondary"> {data&&data.product.numberOfRatings} Ratings</p>
          </div>
          <p className="fs-3 fw-normal">&#8377; 
          {data&&data.product.price}
          </p>
          <div className="d-flex align-items-center mb-3"><strong className="fs-5">Quantity: </strong>
            <button onClick={()=>setQuantity(prev=>prev>1?prev-1:1)}  className="btn fw-bold rounded-circle btn-outline-danger ms-3">-</button>
            <input className="ms-3 form-control" onChange={(e)=>setQuantity(prev=>(parseInt(e.target.value)))} value={quantity}  type="number" style={{width:"4rem"}} min={1}  id="" />
            <button onClick={()=>setQuantity(prev=>prev+1)}  className="btn fw-bold rounded-circle btn-outline-success ms-3">+</button>


          </div>
          <div className="d-flex align-items-center mb-4">
            <strong className="fs-5 me-3">Size: </strong>
            {/* <div className="me-3 px-3 border-2 rounded-0 btn btn-outline-secondary">X</div>
            <div className="me-3 px-3 border-2 rounded-0 btn btn-outline-secondary">XL</div>
            <div className="me-3 px-3 border-2 rounded-0 btn btn-outline-secondary">XXL</div> */}
            {data&&data.product.size.map(each=><div className="me-3 px-3 border-2 rounded-0 btn btn-outline-secondary">
              {each}
            </div>)}
          </div>
          <hr />
          <div>
            <h4>Descriptions</h4>
            <ul>
              <li>{data&&data.product.description}</li>
            </ul>
          </div>
        </div>
      </main>
      
      </>
      // :<div className=" position-absolute top-50 start-50 translate-middle fs-1 text-success">Error While getting the data </div>
      }
    </div>
  )
}

export default ProductDetails