import React, { useEffect, useState } from "react";
import Form from "../Model/Form/Form";
import Listview from "../Model/Listview/Listview";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./Product.css";
import Modal from "react-modal";
import axios from "axios";

function Product() {
  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [edit, setEdit] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [viewProduct, setViewProduct] = useState(false);
  const [currentEle, setCurrentEle] = useState("");
  const [product, setProduct] = useState("");

  useEffect(async () => {
    axios
      .get("https://inqubitbackend.herokuapp.com/api/products")
      .then((res) => {
        console.log(res);
        res.data && setProduct(res.data);
      });
  }, [edit, addModal]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      axios
        .put(
          `https://inqubitbackend.herokuapp.com/api/products/${currentEle._id}`,
          {
            product_id: valueOne,
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
        .post(`https://inqubitbackend.herokuapp.com/api/products/`, {
          product_id: valueOne,
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
    <div className="product">
      <h1>Products</h1>
      <div className="product-header">
        <div>
          <b>Sr. No.</b>
        </div>
        <div>
          <b>Product Id</b>
        </div>
        <div>
          <b>Description</b>
        </div>
        <div>
          <b>Action</b>
        </div>
      </div>
      <Listview
        array={product}
        setUpdate={setEdit}
        setCurrentEle={setCurrentEle}
        setValueOne={setValueOne}
        setValueTwo={setValueTwo}
        setView={setViewProduct}
      />
      <div className="product-add" onClick={() => setAddModal(true)}>
        Add Product&nbsp;
        <AddCircleIcon style={{ fontSize: "30px", color: "#531ebd" }} />
      </div>

      {/* ******************Modal to add Product*************** */}

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
        <div className="form-modal-heading">Add Product</div>
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

      {/* ******************Modal to edit Product*************** */}

      <Modal
        isOpen={edit}
        className="form-modal"
        overlayClassName="form-modal-overlay"
      >
        <div
          className="form-modal-close"
          onClick={() => {
            setEdit(false);
            setCurrentEle("");
            setValueOne("");
            setValueTwo("");
          }}
        >
          &times;
        </div>
        <div className="form-modal-heading"> Edit Product </div>
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

      {/* ******************Modal to view Product*************** */}

      <Modal
        isOpen={viewProduct}
        className="view-modal"
        overlayClassName="view-modal-overlay"
      >
        <div className="view-modal-close" onClick={() => setViewProduct(false)}>
          &times;
        </div>
        <div className="view-modal-header"> Product Detail </div>
        <div className="view-modal-heading"> Product Id: </div>
        <div className="view-modal-body"> {currentEle.product_id} </div>
        <div className="view-modal-heading"> Product Description: </div>
        <div className="view-modal-body"> {currentEle.description} </div>
      </Modal>
    </div>
  );
}

export default Product;
