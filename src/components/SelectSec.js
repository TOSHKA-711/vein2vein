import React from "react";
import "./style/SelectSec.css";

const SelectSec = () => {

  const openNewDocument1 = () => {
    window.open('/bloodDetails', "_self");
  };
  const openNewDocument2 = () => {
    window.open('/donors' , "_self");
  };
  const openNewDocument3 = () => {
    window.open('/community' , "_self");
  };
  const openOldDocument = () => {
    window.open('/', "_self");
  };

  return (
    <div className="select">
      <div className="nav">
        <p className="logo">VEIN 2 VEIN</p>
        <div className="taps">
          <a className="options">Options</a>
          <a>Mail</a>
          <a onClick={openOldDocument}>Exit</a>
          <ul class="list">
            <li>
              <a  onClick={openNewDocument2}>Donors</a>
            </li>
            <li>
              <a onClick={openNewDocument1}>Bank</a>
            </li>
            <li>
              <a onClick={openNewDocument3}>Community</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text">
        <h1>VEIN 2 VEIN</h1>
        <p>vein 2 vein blood donation system</p>
      </div>
    </div>
  );
};

export default SelectSec;
