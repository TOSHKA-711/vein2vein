// import React from "react";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import "./App.css";
// import BloodDetails from "./components/BloodDetails";
// import Donors from "./components/Donors";
// import Login from "./components/Login";
// import SelectSec from "./components/SelectSec";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <div>
//           <Switch>
//             <Route exact path="/" component={Login} />
//             <Route path="/sectionSelect" component={SelectSec} />
//             <Route path="/bloodDetails" component={BloodDetails} />
//             <Route path="/donors" component={Donors} />
//           </Switch>
//         </div>
//       </Router>
//       {/* <Login/> */}
//       {/* <SelectSec/> */}
//       {/* <BloodDetails /> */}
//       {/* <Donors/> */}
//     </div>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BloodDetails from "./components/BloodDetails";
import Community from "./components/Community";
import Donors from "./components/Donors";
import Login from "./components/Login";
import SelectSec from "./components/SelectSec";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sectionSelect" element={<SelectSec />} />
          <Route path="/bloodDetails" element={<BloodDetails />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/community" element={<Community/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
