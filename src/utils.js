import { fetchGoogleSheetsData } from 'google-sheets-mapper';

export const getUniqueId = () => Math.random().toString(16).slice(4);

export const getGoogleSheetData = (sheetId) =>
  fetchGoogleSheetsData({
    apiKey: process.env.REACT_APP_API_KEY,
    sheetId,
  }).then((data) => data[0].data);

export const transformPayrolls = (payrolls) =>
  payrolls.map(({ recipientAccount, token, amount }) => ({
    recipientAccount,
    token,
    amount,
    id: getUniqueId(),
  }));
