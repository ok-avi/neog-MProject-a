import { useState } from "react"
import useFetch from "../../useFetch"
import Nav from "../components/Nav"
import img from "../assets/child.jpg"
import { Link } from "react-router-dom"

const Wishlist = () => {
  const {data,loading,error} = useFetch("https://neog-m-project-a-backend.vercel.app/api/user/680f3af1781afdac18e50245/data")
  const [updatedData,setUpdatedData] = useState()
  console.log(data)
  

  function removeWishlist(productId){
    fetch(`https://neog-m-project-a-backend.vercel.app/api/user/add/cart`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        "userId":"680f3af1781afdac18e50245",
        cartId:productId
      })
    })
    .then(response=>response.json())
    .then((data)=>{
      // console.log("cart added")
    })
    .catch(error=>console.log(error))
    fetch("https://neog-m-project-a-backend.vercel.app/api/user/remove/wishlist",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        "userId":"680f3af1781afdac18e50245",
        "wishlistId":productId
      })
    })
    .then(response=>response.json())
    .then(data=>console.log("removed",data))
    .catch(error=>console.log(error))

    fetch("https://neog-m-project-a-backend.vercel.app/api/user/680f3af1781afdac18e50245/data")
    .then(response=>response.json())
    .then(data=>setUpdatedData(data))
    .catch(error=>console.log("error while fetching"))
    console.log(productId,"updated data",updatedData.user)
  }
  return (
    <div className="bg-secondary-subtle position-relative" style={{minHeight:"100vh"}}>
        <Nav/>
        <main className="mt-5 py-3 container " >
          {/* <div className="row py-4  "></div> */}
          {loading&&<div className="fs-2 text-warning">Loading...</div>}
          {data&&data.user.wishlists.length>0&&<div className="row ">
            {(updatedData?updatedData:data).user.wishlists.map(wishlist=>
            <div className="col-4 mb-3">
              <div  className="card nav-link">
                <div className="card-body">
                  <Link to={`/product/${wishlist._id}`} className="nav-link">
                    <img src={img} alt="" className="w-100" />
                  </Link>
                  <div className="card-text">{wishlist.name}</div>
                  <div className="card-text">
                    <strong className="fs-5">&#8377;{wishlist.price}</strong>
                    <button className="btn btn-danger float-end" onClick={()=>removeWishlist(wishlist._id)}>Move to Cart</button>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
          }
          {data&&data.user.wishlists.length===0&&(
            <div className="fs-1 text-danger fw-medium position-absolute top-50 start-50 translate-middle">No Wishlist Items</div>
          )} 
        </main>
    </div>
  )
}

export default Wishlist