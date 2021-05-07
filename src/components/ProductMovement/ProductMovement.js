import React, { useEffect, useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Modal from "react-modal";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "./ProductMovement.css";
import axios from "axios";

function ProductMovement() {
  const [to_location_id, setToLocationId] = useState("");
  const [from_location_id, setFromLocationId] = useState("");
  const [movement_id, setMovementId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEle, setCurrentEle] = useState("");
  const [viewMovement, setViewMovement] = useState(false);
  const [location, setLocation] = useState("");
  const [productMovement, setProductMovement] = useState("");

  useEffect(() => {
    axios
      .get("https://inqubitbackend.herokuapp.com/api/locations")
      .then((res) => setLocation(res.data));
  }, []);
  useEffect(() => {
    axios
      .get("https://inqubitbackend.herokuapp.com/api/productmovements")
      .then((res) => setProductMovement(res.data));
  }, [isModalOpen]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (currentEle._id) {
      axios
        .put(
          `https://inqubitbackend.herokuapp.com/api/productmovements/${currentEle._id}`,
          {
            from_location_id: from_location_id,
            to_location_id: to_location_id,
            movement_id: movement_id,
          }
        )
        .then(() => {
          setIsModalOpen(false);
          setToLocationId("");
          setFromLocationId("");
          setMovementId("");
          setCurrentEle("");
        })
        .catch((err) => {
          console.log(err, "put");
          alert(err);
        });
    } else {
      axios
        .post(`https://inqubitbackend.herokuapp.com/api/productmovements/`, {
          from_location_id: from_location_id,
          to_location_id: to_location_id,
          movement_id: movement_id,
        })
        .then(() => {
          setIsModalOpen(false);
          setToLocationId("");
          setFromLocationId("");
          setMovementId("");
          setCurrentEle("");
        })
        .catch((err) => {
          alert(err);
          console.log(err, "post");
        });
    }
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
            <b>Movement Id*</b>
          </label>
          <br />
          <input
            value={movement_id}
            onChange={(e) => {
              setMovementId(e.target.value);
            }}
            className="form-input"
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
            <b>Movement Id</b>
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
                <div>{ele.movement_id}</div>
                <div>{ele.from_location_id}</div>
                <div>{ele.to_location_id}</div>
                <div style={{ display: "flex" }}>
                  <EditIcon
                    style={{ marginRight: "1vw" }}
                    className="edit-icon"
                    onClick={() => {
                      setToLocationId(ele.to_location_id);
                      setFromLocationId(ele.from_location_id);
                      setMovementId(ele.movement_id);
                      setCurrentEle(ele);
                      setIsModalOpen(true);
                    }}
                  />
                  <VisibilityIcon
                    className="view-icon"
                    onClick={() => {
                      setCurrentEle(ele);
                      setViewMovement(true);
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* **************Modal to Add and Edit Movement Detail************* */}

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
            setMovementId("");
            setCurrentEle("");
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
            setCurrentEle("");
          }}
        >
          &times;
        </div>
        <div className="view-modal-header"> Product Movement Detail </div>
        <div className="view-modal-heading"> Movement Id: </div>
        <div className="view-modal-body"> {currentEle.movement_id} </div>
        <div className="view-modal-heading"> From Location: </div>
        <div className="view-modal-body"> {currentEle.from_location_id} </div>
        <div className="view-modal-heading"> To Location: </div>
        <div className="view-modal-body"> {currentEle.to_location_id} </div>
        <div className="view-modal-heading"> time: </div>
        <div className="view-modal-body"> {currentEle.timestamp} </div>
      </Modal>
    </div>
  );
}

export default ProductMovement;
