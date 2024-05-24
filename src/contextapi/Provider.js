import React, { useState } from 'react';

const MyContext = React.createContext();

 const MyProvider = ({ children }) => {
  const [selectedValue, setSelectedValue] = useState();

  return (
    <MyContext.Provider value={{ selectedValue, setSelectedValue }}>
      {children}
    </MyContext.Provider>
  );
};

export {MyContext , MyProvider};