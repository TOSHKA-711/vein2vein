import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/Community.css";
import { SlOptions } from "react-icons/sl";
import { HiXMark } from "react-icons/hi2";
import Checkbox from "@mui/material/Checkbox";
import { FaUserCircle } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";

const Community = () => {
  const [names, setNames] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(true);
  const [listVisible, setListVisible] = useState(false);
  const [addDonorVisible, setAddDonorVisible] = useState(false);
  const [messageIconVisible, setMessageIconVisible] = useState(false);
  const [user_names, setUser_names] = useState([]);

  const [dataForm, setDataForm] = useState({
    name: "",
    idnumber: "",
    gender: "",
    bloodtype: "",
    last_donation_date: "",
    phone: "",
    email: "",
  });

  // ---------------- handle send emails to selected users ------

  const handleCheckboxChange = (event, name) => {
    if (event.target.checked) {
      setUser_names([...user_names, name]);
    } else {
      setUser_names(user_names.filter((user) => user !== name));
    }
  };

  const handleSendMails = async (e) => {
    e.preventDefault();
    const url =
      "https://api-service.cloud/vien2vien/public_html/api/auth/send-message";

    // Check if user_names array is empty or null
    if (!user_names || user_names.length === 0) {
      setUser_names([]);
      alert("Please select at least one user.");
      return;
    }

    try {
      // Convert user_names array to a format expected by the API
      const formData = new FormData();
      user_names.forEach((name) => formData.append("user_names[]", name));

      const response = await axios.post(url, formData);
      console.log("Data posted successfully:", response.data);
      alert("mails sent successfully!");
    } catch (error) {
      console.error("Error posting data:", error);
      if (error.response) {
        console.error(
          "Server responded with status code:",
          error.response.status
        );
        console.error("Response data:", error.response.data);

        // Display the error message to the user
        if (error.response.data && error.response.data.message) {
          setUser_names([]);
          alert(error.response.data.message);
        } else {
          setUser_names([]);
          alert("Error sending mails. Please try again later.");
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        setUser_names([]);
        alert("No response received from the server. Please try again later.");
      } else {
        console.error("Request setup error:", error.message);
        setUser_names([]);
        alert("Error setting up the request. Please try again later.");
      }
    };
    // handleXmark();
  };

  // ----------------
  const handleAddForm = (e) => {
    e.preventDefault();
    const url =
      "https://api-service.cloud/vien2vien/public_html/api/auth/Newdonors";
    axios
      .post(url, dataForm)
      .then((response) => {
        console.log("Data posted successfully:", response.data);
        alert("Donor added successfully!");
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        alert("Error adding donor.");
      });
  };

  const handleInputs = (e) => {
    const { id, value } = e.target;
    setDataForm((prevData) => ({ ...prevData, [id]: value }));
  };

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch(
          "https://api-service.cloud/vien2vien/public_html/api/auth/showusers"
        );
        const data = await response.json();
        setNames(data);
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };

    fetchNames();
  }, []);

  const toggleOptions = () => {
    setOptionsVisible((prev) => !prev);
    setListVisible((prev) => !prev);
  };

  const handleSelectDonors = () => {
    const elements = document.querySelectorAll(".check-box");
    elements.forEach((element) => {
      element.style.display = "flex";
    });
  };

  const handleXmark = () => {
    const elements = document.querySelectorAll(".check-box");
    elements.forEach((element) => {
      element.style.display = "none";
    });
    setOptionsVisible(true);
    setListVisible(false);
    setAddDonorVisible(false);
    setMessageIconVisible(false);
  };

  const handleSelectOption = () => {
    setListVisible(false);
    handleSelectDonors();
    setMessageIconVisible(true);
  };

  const handleAddDonorOption = () => {
    setAddDonorVisible(true);
    setListVisible(false);
  };

  const openOldDocument = () => {
    window.open("/sectionSelect", "_self");
  };

  return (
    <div className="donors">
      <div className="nav">
        <p className="logo">VEIN 2 VEIN</p>
        <div className="taps">
          <a className="options">Vein Donors</a>
          <a onClick={openOldDocument}>Exit</a>
        </div>
      </div>
      <div className="container">
        <div className="left">
          <div className="title">
            {listVisible && (
              <ul className="list">
                <li onClick={handleSelectOption}>
                  <span>Select Donors</span>
                </li>
                {/* <li onClick={handleAddDonorOption}>
                  <span>Add Donors</span>
                </li> */}
              </ul>
            )}
            {optionsVisible ? (
              <SlOptions className="option-mark" onClick={toggleOptions} />
            ) : (
              <HiXMark className="x-mark" onClick={handleXmark} />
            )}
            <h1>Donors</h1>
          </div>
          {messageIconVisible && (
            <FaRegMessage className="message-icon" onClick={handleSendMails} />
          )}
          <div className="names">
            {names.map((name) => (
              <div className="name" key={name.id}>
                <Checkbox
                  className="check-box"
                  onChange={(event) => handleCheckboxChange(event, name.name)}
                />
                <p>{name.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="right">
          {addDonorVisible ? (
            <AddDonorForm
              dataForm={dataForm}
              handleInputs={handleInputs}
              handleAddForm={handleAddForm}
            />
          ) : (
            <div className="text">
              <h1>VEIN 2 VEIN</h1>
              <p>vein 2 vein blood donation system</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
      {
        label: "Last Donation Date",
        id: "last_donation_date",
        placeholder: "d/m/y",
      },
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

export default Community;
