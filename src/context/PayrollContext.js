import React, { createContext, useState } from 'react';

export const PayrollContext = createContext();

const PayrollContextProvider = ({ children }) => {
  const [payrolls, updatePayrolls] = useState([]);

  const addPayroll = (payroll) => updatePayrolls([...payrolls, payroll]);

  const addPayrolls = (newPayrolls) => updatePayrolls([...payrolls, ...newPayrolls]);

  const deletePayroll = (id) => updatePayrolls(payrolls.filter((payroll) => payroll.id !== id));

  return (
    <PayrollContext.Provider value={{ payrolls, addPayroll, addPayrolls, deletePayroll }}>
      {children}
    </PayrollContext.Provider>
  );
};

export default PayrollContextProvider;
