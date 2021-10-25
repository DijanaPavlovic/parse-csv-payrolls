import React, { useContext, useCallback, useState, useEffect } from 'react';

import Papa from 'papaparse';
import { useDropzone } from 'react-dropzone';

import logo from '../../assets/logo.png';
import { ReactComponent as UploadIcon } from '../../assets/upload.svg';
import { PayrollContext } from '../../context/PayrollContext';
import { transformPayrolls } from '../../utils';
import GoogleSheetForm from './GoogleSheetForm';
import PayrollForm from './PayrollForm';

const WelcomePage = () => {
  const { payrolls, addPayroll, addPayrolls, deletePayroll } = useContext(PayrollContext);
  const [csvPayrolls, setCsvPayrolls] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      parseFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'text/csv' });

  const parseFile = (file) => {
    Papa.parse(file, {
      header: true,
      complete: ({ data }) => setCsvPayrolls(transformPayrolls(data)),
    });
  };

  useEffect(() => addPayrolls(csvPayrolls), [csvPayrolls]);

  const renderPayroll = ({ recipientAccount, token, amount, id }) => (
    <div key={id} className="grid grid-cols-12 gap-2 text-sm my-2">
      <div className="col-span-5 h-9 p-1 py-2 bg-gray rounded-md">{recipientAccount}</div>
      <div className="col-span-3 p-1 h-9 py-2 bg-gray rounded-md">{token}</div>
      <div className="col-span-3 p-1 h-9 py-2 bg-gray rounded-md">{amount}</div>
      <button
        className="h-9 border-transparent font-medium rounded bg-primary hover:opacity-90"
        onClick={() => deletePayroll(id)}>
        -
      </button>
    </div>
  );

  return (
    <>
      <header className="sm:px-6 py-8 sm:py-12">
        <img src={logo} className="w-24 mx-auto" alt="StreamFlow Finance logo" />
        <h1 className="text-5xl sm:text-6xl text-center">
          Stream<b>Flow</b>
        </h1>
      </header>

      <main className="w-11/12 sm:w-3/5 xl:w-2/5 mx-auto">
        <div className="btn-upload w-64 sm:w-80 h-14" {...getRootProps()}>
          <input {...getInputProps()} />
          <span className="mr-2">{'Upload CSV '}</span>
          <UploadIcon className="w-6" />
        </div>
        <GoogleSheetForm addPayrolls={addPayrolls} />
        <PayrollForm addPayroll={addPayroll} />
        {payrolls.map((payroll) => renderPayroll(payroll))}
      </main>
    </>
  );
};

export default WelcomePage;
