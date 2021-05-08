import React, { useEffect, useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Modal from "react-modal";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "./ProductMovement.css";
import axios from "axios";

let currentEle = "";

function ProductMovement() {
  const [to_location_id, setToLocationId] = useState("");
  const [from_location_id, setFromLocationId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMovement, setViewMovement] = useState(false);
  const [location, setLocation] = useState("");
  const [productMovement, setProductMovement] = useState("");
  const [product, setProduct] = useState("");
  const [product_id, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  // ************useEffects to fetch initial datas****************

  function fetchMovement() {
    axios
      .get("https://inqubitbackend.herokuapp.com/api/productmovements")
      .then((res) => setProductMovement(res.data));
  }

  useEffect(() => {
    axios
      .get("https://inqubitbackend.herokuapp.com/api/locations")
      .then((res) => setLocation(res.data));

    axios
      .get("https://inqubitbackend.herokuapp.com/api/products")
      .then((res) => {
        setProduct(res.data);
      });
  }, []);
  useEffect(() => {
    fetchMovement();
  }, []);

  // ***********function to handle form submition **************

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log({
      from_location_id: from_location_id,
      to_location_id: to_location_id,
      product_id: product_id,
      quantity: quantity,
    });

    console.log({
      from_location_id: from_location_id,
      to_location_id: to_location_id,
      product_id: product_id,
      quantity: quantity,
    });
    axios
      .post(`https://inqubitbackend.herokuapp.com/api/productmovements/`, {
        from_location_id: from_location_id,
        to_location_id: to_location_id,
        product_id: product_id,
        quantity: quantity,
      })
      .then(() => {
        setIsModalOpen(false);
        setToLocationId("");
        setFromLocationId("");
        setProductId("");
        setQuantity(1);
        currentEle = "";
        fetchMovement();
      })
      .catch((err) => {
        alert(err);
        console.log(err, "post");
      });
  };

  // ********************function to delete element*******************

  const deleteElement = () => {
    console.log(currentEle);
    axios
      .delete(
        `https://inqubitbackend.herokuapp.com/api/productmovements/${currentEle._id}`
      )
      .then(() => {
        console.log("deleted");
        currentEle = "";
      })
      .catch((err) => {
        console.log(err, "error");
        alert(err);
      });
  };

  // ***********Function which returns a form*************

  const showForm = () => {
    return (
      <div className="form">
        <form onSubmit={handleFormSubmit}>
          <label>
            <b>From Location*</b>
          </label>
          <br />
          <select
            value={from_location_id}
            onChange={(e) => {
              setFromLocationId(e.target.value);
            }}
            className="option"
            required
          >
            {location &&
              location.map((ele, i) => (
                <option key={i} value={ele.location_id}>
                  {ele.location_id}
                </option>
              ))}
          </select>
          <br />
          <label>
            <b>To Location*</b>
          </label>
          <br />
          <select
            value={to_location_id}
            onChange={(e) => {
              setToLocationId(e.target.value);
              console.log(e.target.value);
            }}
            className="option"
            required
          >
            {location &&
              location.map((ele, i) => (
                <option key={i} value={ele.location_id} className="option">
                  {ele.location_id}
                </option>
              ))}
          </select>
          <br />
          <label>
            <b>Product ID*</b>
          </label>
          <br />
          <select
            value={product_id}
            onChange={(e) => {
              setProductId(e.target.value);
              console.log(e.target.value);
            }}
            className="option"
            required
          >
            {product &&
              product.map((ele, i) => (
                <option key={i} value={ele.product_id} className="option">
                  {ele.product_id}
                </option>
              ))}
          </select>
          <br />
          <label>
            <b>Quantity*</b>
          </label>
          <br />
          <input
            className="form-input"
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
            min={1}
            required
          />
          <br />
          <br />
          <button className="form-submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  };

  // ***************** Main body ****************

  return (
    <div className="movement">
      <div className="movement-body">
        <h1>Product Movements</h1>
        <div className="movement-body-header">
          <div>
            <b>Sr. No.</b>
          </div>
          <div>
            <b>Quantity</b>
          </div>
          <div>
            <b>From Location</b>
          </div>
          <div>
            <b>To Location</b>
          </div>
          <div>
            <b>Action</b>
          </div>
        </div>
        <div className="movement-add" onClick={() => setIsModalOpen(true)}>
          Add Product&nbsp;
          <AddCircleIcon style={{ fontSize: "30px", color: "#531ebd" }} />
        </div>

        {/* ********************Listing Movement details************** */}

        <div className="movement-list">
          {productMovement &&
            productMovement.map((ele, i) => (
              <div key={i} className="movement-list-datail">
                <div>
                  <b>{i + 1}</b>
                </div>
                <div>{ele.quantity}</div>
                <div>{ele.from_location_id}</div>
                <div>{ele.to_location_id}</div>
                <div style={{ display: "flex" }}>
                  <DeleteForeverIcon
                    style={{ marginRight: "1vw" }}
                    className="edit-icon"
                    onClick={() => {
                      currentEle = ele;
                      deleteElement();
                    }}
                  />
                  <VisibilityIcon
                    className="view-icon"
                    onClick={() => {
                      currentEle = ele;
                      setViewMovement(true);
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* **************Modal to Add  Movement Detail************* */}

      <Modal
        isOpen={isModalOpen}
        className="edit-form-modal"
        overlayClassName="edit-form-modal-overlay"
      >
        <div
          className="form-modal-close"
          onClick={() => {
            setIsModalOpen(false);
            setToLocationId("");
            setFromLocationId("");
            setProductId("");
            setQuantity(1);
            currentEle = "";
          }}
        >
          &times;
        </div>
        <div className="edit-form-modal-heading">
          {to_location_id ? "Edit" : "Add"} Product Movement
        </div>
        <div className="content">{showForm()}</div>
      </Modal>

      {/* ********************Modal to view Movement Detail******************* */}

      <Modal
        isOpen={viewMovement}
        className="view-modal"
        overlayClassName="view-modal-overlay"
      >
        <div
          className="view-modal-close"
          onClick={() => {
            setViewMovement(false);
            currentEle = "";
          }}
        >
          &times;
        </div>
        <div className="view-modal-header"> Product Movement Detail </div>
        <div className="view-modal-heading"> From Location: </div>
        <div className="view-modal-body"> {currentEle.from_location_id} </div>
        <div className="view-modal-heading"> To Location: </div>
        <div className="view-modal-body"> {currentEle.to_location_id} </div>
        <div className="view-modal-heading"> Quantity: </div>
        <div className="view-modal-body"> {currentEle.quantity} </div>
        <div className="view-modal-heading"> time: </div>
        <div className="view-modal-body"> {currentEle.timestamp} </div>
      </Modal>
    </div>
  );
}

export default ProductMovement;
