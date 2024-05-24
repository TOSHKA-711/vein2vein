import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./style/BloodDetails.css";
import TextField from "@mui/material/TextField";
import BloodItem from "../elements/BloodItem";
import { MyContext } from "../contextapi/Provider";

const BloodDetails = () => {
  const { selectedValue, setSelectedValue } = useContext(MyContext);
  const [formData, setFormData] = useState({
    hospital: "",
    bank: "",
    instructions: "",
    doctor: "",
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      selectedValue: selectedValue,
    }));
  }, [selectedValue]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedValue({
      ...formData,
    });
  };

  useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue]);

  const openOldDocument = () => {
    window.open("/sectionSelect", "_self");
  };

  const handleSave = () => {
    const url =
      "https://api-service.cloud/vien2vien/public_html/api/auth/createdemand";
    axios
      .post(url, selectedValue)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        alert("saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("Error saving data.");
      });
  };

  return (
    <div className="blood">
      <div className="nav">
        <p className="logo">VEIN 2 VEIN</p>
        <div className="taps">
          <a>Mail</a>
          <a onClick={openOldDocument}>Exit</a>
        </div>
      </div>
      <div className="container">
        <div className="header">
          <h1 className="title">REQUESTING BLOOD BAGS</h1>
        </div>
        <form className="inputs" onSubmit={handleSubmit}>
          <TextField
            name="hospital"
            label="Hospital"
            variant="standard"
            value={formData.hospital}
            onChange={handleInputChange}
          />
          <TextField
            name="doctor"
            label="Doctor"
            variant="standard"
            value={formData.doctor}
            onChange={handleInputChange}
          />
          <TextField
            name="bank"
            label="Blood Bank"
            variant="standard"
            value={formData.bank}
            onChange={handleInputChange}
          />
          <TextField
            name="instructions"
            label="Instructions"
            variant="standard"
            value={formData.instructions}
            onChange={handleInputChange}
          />
          <button type="submit" onClick={handleSave}>
            Save
          </button>
        </form>
        <div className="type">
          <h1>Blood Type :</h1>
          <div className="container2">
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
              <BloodItem key={type} className="item" name={type} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodDetails;
