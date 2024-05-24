
import React, { useState, useContext } from "react";
import Checkbox from "@mui/material/Checkbox";
import "./BloodItem.css";
import { FaChevronDown } from "react-icons/fa6";
import { MyContext } from '../contextapi/Provider';

const BloodItem = (props) => {
  const { selectedValue, setSelectedValue } = useContext(MyContext);

  const [state, setState] = useState({
    mainCheck: '',
    inputValues: {
      fullBag: 0,
      redCells: 0,
      plasma: 0,
      cryo: 0,
      platelets: 0,
      granulocytes: 0,
    },
    checkedItems: {
      main: false,
      fullBag: false,
      redCells: false,
      plasma: false,
      cryo: false,
      platelets: false,
      granulocytes: false,
    },
    listVisible: false,
  });

  const handleMainCheck = (e) => {
    const value = e.target.value;
    setState((prevState) => ({
      ...prevState,
      mainCheck: value,
      checkedItems: { ...prevState.checkedItems, [value]: !prevState.checkedItems[value] },
    }));
  };

  const handleCheckboxChange = (name) => (event) => {
    const isChecked = event.target.checked;
    setState((prevState) => ({
      ...prevState,
      checkedItems: { ...prevState.checkedItems, [name]: isChecked },
    }));
    if (!isChecked) {
      setState((prevState) => ({
        ...prevState,
        inputValues: { ...prevState.inputValues, [name]: 0 },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        inputValues: { ...prevState.inputValues, [name]: 1 }, // Set input value to 1 when checked
      }));
    }
  };

  const handleInputChange = (name) => (event) => {
    const value = parseInt(event.target.value);
    setState((prevState) => ({
      ...prevState,
      inputValues: { ...prevState.inputValues, [name]: isNaN(value) ? 0 : value },
    }));
    if (value > 0) {
      setState((prevState) => ({
        ...prevState,
        checkedItems: { ...prevState.checkedItems, [name]: true },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        checkedItems: { ...prevState.checkedItems, [name]: false },
      }));
    }
  };

  const handleIconClick = () => {
    setState((prevState) => ({
      ...prevState,
      listVisible: !prevState.listVisible,
    }));
  };

  React.useEffect(() => {
    setSelectedValue({
      type: state.mainCheck,
      checkedItems: state.inputValues,
    });
  }, [state.mainCheck, state.inputValues, setSelectedValue]);

  // console.log(selectedValue);

  return (
    <div className="item">
      <Checkbox
        checked={state.checkedItems.main}
        onChange={handleCheckboxChange("main")}
        inputProps={{ "aria-label": "controlled" }}
        value={props.name}
        onClick={handleMainCheck}
      />
      <p>{props.name}</p>

      <div className="options" onClick={handleIconClick}>
        <FaChevronDown className="list-icon" />
        <div className="list" style={{ display: state.listVisible ? "flex" : "none" }}>
          {Object.keys(state.checkedItems).map((key) => key !== "main" && (
            <div key={key} className="choice">
              <Checkbox
                checked={state.checkedItems[key]}
                onChange={handleCheckboxChange(key)}
                inputProps={{ "aria-label": "controlled" }}
              />
              <p>{key}</p>
              <input
                type="number"
                value={state.inputValues[key]}
                onChange={handleInputChange(key)}
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BloodItem;
