import React from "react";
import { getItemTemplate } from "./data/TraumaTower";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { ReactComponent as ArrowLeft } from "./icons/arrow-left.svg";

// Icons vuesax linear. Licence: https://iconsax.io/#license

function ItemDetails() {
  let { boxTemplateId, itemId } = useParams();
  let navigate = useNavigate();

  const itemTemplate =
    boxTemplateId && itemId
      ? getItemTemplate(boxTemplateId, itemId)
      : undefined;

  return (
    <div className="item-details">
      <header>
        <button
          type="button"
          className="back"
          aria-label="Back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </button>

        <h1>Item Details</h1>
      </header>
      <main>
        {itemTemplate && (
          <>
            <img
              src={`/items/${itemTemplate.photo}`}
              className="item-photo"
              alt=""
            />
            <h2 className="name">{itemTemplate.name}</h2>
            <dl className="details">
              <div className="description">
                <dt>Description</dt>
                <dd>{itemTemplate.description}</dd>
              </div>
              <div className="size">
                <dt>Size</dt>
                <dd>{itemTemplate.size || "N/A"}</dd>
              </div>
              <div className="location">
                <dt>Location</dt>
                <dd>{itemTemplate.location}</dd>
              </div>
            </dl>
          </>
        )}
      </main>
    </div>
  );
}

export default ItemDetails;
