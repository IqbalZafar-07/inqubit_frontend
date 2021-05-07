import React, { useEffect, useState } from "react";
import Form from "../Model/Form/Form";
import "./Location.css";
import Listview from "../Model/Listview/Listview";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import Modal from "react-modal";
import axios from "axios";

function Location() {
  const [location, setLocation] = useState("");
  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [edit, setEdit] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [viewLocation, setViewLocation] = useState(false);
  const [currentEle, setCurrentEle] = useState("");

  useEffect(async () => {
    axios
      .get("https://inqubitbackend.herokuapp.com/api/locations")
      .then((res) => {
        console.log(res);
        res.data && setLocation(res.data);
      });
  }, [edit, addModal]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      axios
        .put(
          `https://inqubitbackend.herokuapp.com/api/locations/${currentEle._id}`,
          {
            location_id: valueOne,
            description: valueTwo,
          }
        )
        .then(() => {
          setEdit(false);
          setValueOne("");
          setValueTwo("");
          setCurrentEle("");
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
    if (addModal) {
      axios
        .post(`https://inqubitbackend.herokuapp.com/api/locations/`, {
          location_id: valueOne,
          description: valueTwo,
        })
        .then(() => {
          setAddModal(false);
          setValueOne("");
          setValueTwo("");
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <div className="location">
      <h1>Locations</h1>
      <div className="loaction-header">
        <div>
          <b>Sr. No.</b>
        </div>
        <div>
          <b>Location Id</b>
        </div>
        <div>
          <b>Description</b>
        </div>
        <div>
          <b>Action</b>
        </div>
      </div>
      <Listview
        array={location}
        img={"/images/giphy.webp"}
        setUpdate={setEdit}
        setValueOne={setValueOne}
        setValueTwo={setValueTwo}
        setCurrentEle={setCurrentEle}
        setView={setViewLocation}
      />
      <div
        className="location-add"
        onClick={() => {
          setAddModal(true);
        }}
      >
        Add Location&nbsp;
        <AddLocationIcon style={{ fontSize: "30px", color: "#531ebd" }} />
      </div>

      {/* ******************Modal to add Location*************** */}

      <Modal
        isOpen={addModal}
        className="form-modal"
        overlayClassName="form-modal-overlay"
      >
        <div
          className="form-modal-close"
          onClick={() => {
            setAddModal(false);
          }}
        >
          &times;
        </div>
        <div className="form-modal-heading">Add Location</div>
        <div className="content">
          <Form
            valueOne={valueOne}
            valueTwo={valueTwo}
            setValueOne={setValueOne}
            setValueTwo={setValueTwo}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </Modal>

      {/* ******************Modal to edit Location*************** */}

      <Modal
        isOpen={edit}
        className="form-modal"
        overlayClassName="form-modal-overlay"
      >
        <div
          className="form-modal-close"
          onClick={() => {
            setEdit(false);
            setValueOne("");
            setValueTwo("");
          }}
        >
          &times;
        </div>
        <div className="form-modal-heading"> Edit Location </div>
        <div className="content">
          <Form
            valueOne={valueOne}
            valueTwo={valueTwo}
            setValueOne={setValueOne}
            setValueTwo={setValueTwo}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </Modal>

      {/* ******************Modal to view Location*************** */}

      <Modal
        isOpen={viewLocation}
        className="view-modal"
        overlayClassName="view-modal-overlay"
      >
        <div
          className="view-modal-close"
          onClick={() => setViewLocation(false)}
        >
          &times;
        </div>
        <div className="view-modal-header"> Location Detail </div>
        <div className="view-modal-heading"> Product Id: </div>
        <div className="view-modal-body"> {currentEle.location_id} </div>
        <div className="view-modal-heading"> Product Description: </div>
        <div className="view-modal-body"> {currentEle.description} </div>
        <div className="content"></div>
      </Modal>
    </div>
  );
}

export default Location;
