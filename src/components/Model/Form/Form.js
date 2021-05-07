import React, { useEffect, useState } from "react";
import "./Form.css";

function Form({
  valueOne,
  valueTwo,
  setValueOne,
  setValueTwo,
  handleFormSubmit,
}) {
  return (
    <div className="form">
      <form onSubmit={handleFormSubmit}>
        <label>
          <b>Id*</b>
        </label>
        <br />
        <input
          value={valueOne}
          onChange={(e) => {
            setValueOne(e.target.value);
          }}
          className="form-input"
          required
        />
        <br />
        <label>
          <b>Description*</b>
        </label>
        <br />
        <input
          value={valueTwo}
          onChange={(e) => {
            setValueTwo(e.target.value);
          }}
          className="form-input"
          minLength={2}
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
}

export default Form;
