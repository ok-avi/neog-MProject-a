import Nav from "../components/Nav";
import men from "../assets/men.jpg";
import useFetch from "../../useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [updatedData, setUpdatedData] = useState();
  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/user/680f3af1781afdac18e50245/data`
  );
  const totalPrice =
    data &&
    data.user.carts
      .map((cart) => cart.price)
      .reduce((acc, curr) => acc + curr, 0);
  const deliveryCharges = 500;

  console.log(data, totalPrice);
  function removeFromCart(productId) {
    fetch(`http://localhost:3000/api/user/remove/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "680f3af1781afdac18e50245",
        cartId: productId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
      })
      .catch((error) => console.log(error));
    fetch("http://localhost:3000/api/user/680f3af1781afdac18e50245/data")
      .then((response) => response.json())
      .then((data) => setUpdatedData(data))
      .catch((error) => console.log(error));
    console.log("remove", updatedData);
  }
  return (
    <div className="bg-secondary-subtle">
      <Nav />
      <main
        className="row  py-4  mx-auto container position-relative"
        style={{ minHeight: "90vh" }}
      >
        {loading && <div className="fs-1 text-warning ">Loading...</div>}

        {data && (
          <>
            {/* {updatedData
              ? `${updatedData.user.carts.map((cart) => `${cart.price}`)}`
              : "data"}
            {updatedData && updatedData.user ? `updatedData` : "data"} */}
            {(updatedData ? updatedData : data).user.carts.length ? (<>
            <div className="col row">
              {data &&
                (updatedData ? updatedData : data).user.carts.map((cart) => (
                  <div className="col-6">
                    <div  className=" card mx-3 my-2" style={{ width: "18rem" }}>
                      <div className="card-body">
                        <Link to={`/product/${cart._id}`} className="nav-link">
                          <img src={men} className="card-img-top" alt="..." />
                        </Link>
                        <p className="card-text p-0">{cart.name} </p>
                        <div className="d-flex justify-content-between">
                          <h5 className="card-title my-2">
                            &#8377;
                            {cart.price}
                          </h5>
                          <button
                            onClick={() => removeFromCart(cart._id)}
                            className="btn btn-danger"
                          >
                            Remove{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            
              <div className="col px-4 py-2 ">
                <div
                  className="px-4 py-4 bg-white rounded border mx-auto"
                  style={{ width: "20rem" }}
                >
                  <h2>Price Details</h2>
                  <hr />
                  <p>
                    Price (1 item){" "}
                    <span className="float-end">&#8377; {totalPrice}</span>
                  </p>
                  <div>
                    Delivery Charges{" "}
                    <span className="float-end">&#8377; {deliveryCharges}</span>
                  </div>
                  <hr />
                  <div>
                    <strong>Total Amount</strong>
                    <strong className="float-end">
                      &#8377; {totalPrice + deliveryCharges}
                    </strong>
                  </div>
                  <hr />
                  <button className="btn btn-success">Place Order</button>
                </div>
              </div>
            </>
            ) : (
              <span className="fs-1 text-danger fw-medium mx-auto my-auto text-center">
                No Cart Items
              </span>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Cart;
