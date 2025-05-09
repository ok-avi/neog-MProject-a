import { useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"

const Nav = ({searchHandler,inputSearch,setInputSearch}) => {
  const {pathname} = useLocation()
  // console.log(pathname,pathname.split("/")[1])

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid container">
            <Link className="navbar-brand text-secondary" to="/"><h4 className="display-6 fw-medium">Shopping</h4></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
              
              <form onSubmit={searchHandler} className="input-group w-sm-25 w-50 mx-lg-auto my-sm-3" >
                <>
                  {pathname.split("/")[1]==="products"&&(<>
                    <input value={inputSearch} onChange={(e)=>setInputSearch(e.target.value)} type="text" className="form-control" placeholder="Search Product" aria-label="Username" aria-describedby="basic-addon1"/>
                    <button type="submit"  className="btn btn-secondary">Search</button>
                  </>)}
                </>
              </form>

              <div className="navbar-nav  align-items-lg-center ">
                <Link className="nav-link  w-50 mx-lg-3 my-sm-2  text-bg-secondary rounded px-4 active"  to="/login">Login</Link>
                
                <Link className="nav-link justify-self- my-sm-2 mx-lg-3 p-0 bg- position-relative" to="/wishlist">
                  {/* Wishlist */}
                  <img width="40" height="40" src="https://img.icons8.com/ios/50/hearts--v2.png" alt="hearts--v1"/>
                  <span className="position-absolute top-0 start-lg-100 translate-middle  rounded-pill bg-danger badge ">
                    
                  </span>
                </Link>
                <Link className="nav-link my-sm-1 mx-lg-3 p-0 bg- position-relative" to="/cart">
                  {/* Cart */}
                  <img width="42" height="42" src="https://img.icons8.com/fluency-systems-regular/90/shopping-cart--v2.png" alt="shopping-cart--v1"/>
                  <span className="position-absolute top-0 start-lg-100 translate-middle  rounded-pill bg-danger badge ">
                    
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
    </>
  )
}

export default Nav