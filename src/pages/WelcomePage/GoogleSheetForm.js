import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { getGoogleSheetData, transformPayrolls } from '../../utils';

const defaulValues = { googleSheetsLink: '' };

const GoogleSheetForm = ({ addPayrolls }) => {
  const [googleSheetPayrolls, setGoogleSheetPayrolls] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaulValues,
  });

  const onSubmit = async ({ googleSheetsLink }) => {
    const sheetId = googleSheetsLink.split('/')[5];
    const googleSheetPayrolls = await getGoogleSheetData(sheetId);
    setGoogleSheetPayrolls(transformPayrolls(googleSheetPayrolls));
    reset(defaulValues);
  };

  useEffect(() => addPayrolls(googleSheetPayrolls), [googleSheetPayrolls]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-10 gap-2 text-sm mb-8">
      <input
        placeholder="Link to google sheets"
        {...register('googleSheetsLink', { required: true })}
        className="col-start-2 col-span-5 text-xs sm:cal-span-4 p-1 h-8 sm:h-10 bg-gray border rounded-md border-primary focus:outline-none focus:ring-1 focus:ring-primary mt-5 sm:mt-10"
      />
      <button
        type="submit"
        disabled={!isValid}
        className="btn-upload w-full col-span-3 sm: cal-span-1">
        Upload
      </button>
    </form>
  );
};

export default GoogleSheetForm;
