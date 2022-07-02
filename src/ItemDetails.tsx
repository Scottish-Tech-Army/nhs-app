import React from "react";
import { getItemTemplate } from "./data/TraumaTower";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";

function ItemDetails() {
  let { boxTemplateId, itemId } = useParams();
  let navigate = useNavigate();

  const itemTemplate =
    boxTemplateId &&
    itemId !== undefined &&
    getItemTemplate(boxTemplateId, itemId);

  return (
    <div className="item-details">
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>

      <h1>Item Details</h1>

      {itemTemplate && (
        <>
          <img
            src={`/items/${itemTemplate.photo}`}
            className="item-photo"
            alt=""
          />
          <h2 className="name">{itemTemplate.name}</h2>
          <dl>
            <div className="description">
              <dt>Description</dt>
              <dd>{itemTemplate.description}</dd>
            </div>
          </dl>
          <dl>
            <div className="size">
              <dt>Size</dt>
              <dd>
                {itemTemplate.size !== undefined ? itemTemplate.size : "-"}
              </dd>
            </div>
          </dl>
          <dl>
            <div className="location">
              <dt>Location</dt>
              <dd>{itemTemplate.location}</dd>
            </div>
          </dl>
        </>
      )}
    </div>
  );
}

export default ItemDetails;
