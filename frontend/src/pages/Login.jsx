import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import useFetch from "../../useFetch";
import img from "../assets/child.jpg"
import { useState } from "react";

const Login = () => {
  const [address, setAddress] = useState({
    city: null,
    district: null,
    state: null,
    pincode: null,
  });
  const param = useParams();
  const { data, loading, error } = useFetch(
    "https://neog-m-project-a-backend.vercel.app/api/user/680f3af1781afdac18e50245/data"
  );

  data && console.log(data.user);
  function formHandler(e) {
    e.preventDefault();
    fetch("https://neog-m-project-a-backend.vercel.app/api/user/680f3af1781afdac18e50245/data",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        [address.city!==null&&city]:""
      })
    })
    // console.log(address);
  }
  return (
    <div className="bg-secondary-subtle" style={{ minHeight: "100vh" }}>
      <Nav />
      <main className="container py-5 my-2 ">
      {loading&&<div className="fs-2 text-warning text-center">Loading...</div>}
        {data && (
          <div className="row">
            <div className="col-lg-2 mb-3   ">
              <img
                className="d-block rounded-circle mx-auto "
                src="https://randomuser.me/api/portraits/women/3.jpg"
                alt=""
              />
            </div>
            <div className="col-lg mb-3">
              <form className="w-lg-75" onSubmit={formHandler}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={data.user.name}
                    readOnly={true}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={data.user.email}
                    readOnly={true}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phoneNumber"
                    value={data.user.phoneNumber}
                    readOnly={true}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="row">
                  <div>
                    <strong>Address </strong>
                    {/* {address?.city} */}
                  </div>
                  {data.user.address.map((each) => (
                    <>
                      <div className="col-6 mb-3">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          value={
                            address.city === null ? each.city : address.city
                          }
                          onChange={(e) =>
                            setAddress((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="district">District</label>
                        <input
                          type="text"
                          className="form-control"
                          id="district"
                          value={
                            address.district === null
                              ? each.district
                              : address.district
                          }
                          onChange={(e) =>
                            setAddress((prev) => ({
                              ...prev,
                              district: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          className="form-control"
                          id="state"
                          value={
                            address.state === null ? each.state : address.state
                          }
                          onChange={(e) =>
                            setAddress((prev) => ({
                              ...prev,
                              state: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="pincode">Pincode</label>
                        <input
                          type="text"
                          className="form-control"
                          id="pincode"
                          value={
                            address.pincode === null
                              ? each.pincode
                              : address.pincode
                          }
                          onChange={(e) =>
                            setAddress((prev) => ({
                              ...prev,
                              pincode: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </>
                  ))}
                </div>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </form>
            </div>
            <div className="col-lg mb-3 ">
              <h3 className="text-center mb-3">Orders</h3>
              <div className="row">
                {data &&
                  data.user.orders.map((order) => (
                    <div className="col-6 mb-3">
                      <div className="card ">
                        <div className="card-body">
                          <div to={`/product/${order._id}`} className="nav-link">
                            <img src={img} alt="" className="w-100" />
                          </div>
                          <div className="card-text">{order.name}</div>
                          <div className="card-text">
                            <strong className="fs-5">&#8377;{order.price}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }

              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Login;
