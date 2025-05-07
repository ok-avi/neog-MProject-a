import men from "./assets/men.jpg"
import women from "./assets/women.jpg"
import child from "./assets/child.jpg"

import Nav from "./components/Nav"
import { Link } from "react-router-dom"
const App = () => {
  return (
    <div className="bg-secondary-subtle" style={{height:"100vh"}}>
      <Nav />
      <main className="container py-4">
        <section>
          <h2 >Clothing</h2>
          <div className="row py-2">
            <div className=" mb-3 col-sm-6 col-lg-3 "  >
              <Link className="card nav-link" to="/products/men" style={{width:"16rem"}}>
                <div className="card-body">
                <img 
                src={men}
                className="card-img-top" alt="..."/>
                  <h5 className="card-title my-2">Men</h5>
                  <p className="card-text">.</p>
                </div>
              </Link>
            </div>
            <div className=" mb-3 col-sm-6 col-lg-3 "  >
              <Link className="card nav-link" to="/products/women" style={{width:"16rem"}}>
                <div className="card-body">
                <img 
                src={women}
                className="card-img-top" alt="..."/>
                  <h5 className="card-title my-2">Women</h5>
                  <p className="card-text">.</p>
                </div>
              </Link>
            </div>
            <div className=" mb-3 col-sm-6 col-lg-3 " >
              <Link className="card nav-link" to="/products/children" style={{width:"16rem"}}>
                <div className="card-body">
                <img 
                src={child}
                className="card-img-top" alt="..."/>
                  <h5 className="card-title my-2">Children</h5>
                  <p className="card-text">.</p>
                </div>
              </Link>
            </div>
            {/* <div className=" mb-3 col-sm-6 col-lg-3 " >
              <Link className="card nav-link" to="/products/animal" style={{width:"16rem"}}>
                <div className="card-body">
                <img 
                src={child}
                className="card-img-top" alt="..."/>
                  <h5 className="card-title my-2">Animal</h5>
                  <p className="card-text">.</p>
                </div>
              </Link>
            </div> */}
          </div>

        </section>

      </main>
    </div>
  )
}

export default App