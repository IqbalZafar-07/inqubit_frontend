import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "./Listview.css";

function Listview({
  array,
  img,
  setUpdate,
  setValueOne,
  setValueTwo,
  setCurrentEle,
  setView,
}) {
  return (
    <div className="listview">
      {array
        ? array.map((ele, i) => (
            <div className="listview-datail" key={i}>
              <div>
                <b>{i + 1}</b>
              </div>
              <div>{img ? ele.location_id : ele.product_id}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {img && <img className="listview-image" src={img} />}
                {ele.description}
              </div>
              <div style={{ display: "flex" }}>
                <EditIcon
                  className="edit-icon"
                  onClick={() => {
                    setValueOne(img ? ele.location_id : ele.product_id);
                    setValueTwo(ele.description);
                    setCurrentEle(ele);
                    setUpdate(true);
                  }}
                  style={{ marginRight: "1vw" }}
                />
                <VisibilityIcon
                  className="view-icon"
                  onClick={() => {
                    setCurrentEle(ele);
                    setView(true);
                  }}
                />
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

export default Listview;
