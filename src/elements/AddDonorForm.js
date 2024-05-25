import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "../components/style/Donors.css"
const AddDonorForm = ({ dataForm, handleInputs, handleAddForm }) => (
  <div className="box">
    <div className="title">
      <FaUserCircle className="icon" />
      <h1>New Donor</h1>
    </div>
    {[
      { label: "Name", id: "name", placeholder: "Mohamed" },
      { label: "Id Number", id: "idnumber", placeholder: "00000000" },
      { label: "Gender", id: "gender", placeholder: "male" },
      { label: "Blood Type", id: "bloodtype", placeholder: "A+" },
      { label: "Last Donation Date", id: "last_donation_date", placeholder: "d/m/y" },
      { label: "Phone", id: "phone", placeholder: "0100000000" },
      { label: "Email", id: "email", placeholder: "Mohamed@gmail.com" },
    ].map(({ label, id, placeholder }) => (
      <div className="child" key={id}>
        <p>{label}:</p>
        <input
          type="text"
          placeholder={placeholder}
          id={id}
          value={dataForm[id]}
          onChange={handleInputs}
        />
      </div>
    ))}
    <div className="child last-child">
      <button onClick={handleAddForm}>Add</button>
    </div>
  </div>
);

export default AddDonorForm;
