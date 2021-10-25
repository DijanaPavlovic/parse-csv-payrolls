import React from 'react';

import { useForm } from 'react-hook-form';

import { getUniqueId } from '../../utils';

const defaulValues = { recipientAccount: '', token: 'SOL', amount: '', id: '' };

const tokens = ['SOL', 'BTC', 'SRM', 'STRM'];

const PayrollForm = ({ addPayroll }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaulValues,
  });

  const onSubmit = (formValues) => {
    addPayroll({ ...formValues, id: getUniqueId() });
    reset(defaulValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-2 text-sm mb-8">
      <label className="col-span-5" htmlFor="recipient-account">
        Recipient Account
      </label>
      <label className="col-span-3" htmlFor="token">
        Token
      </label>
      <label className="col-span-3" htmlFor="account">
        Amount
      </label>
      <input
        name="recipient-account"
        {...register('recipientAccount', {
          required: true,
          maxLength: 20,
          pattern: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,
        })}
        className="col-span-5 p-1 h-8 sm:h-10 bg-gray border rounded-md border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <select
        name="token"
        {...register('token', { required: true, maxLength: 5 })}
        className="col-span-3 h-8 sm:h-10 p-1 bg-gray border rounded-md border-primary focus:outline-none focus:ring-1 focus:ring-primary">
        {tokens.map((token) => (
          <option key={token} value={token} className="text-xs hover:bg-primary">
            {token}
          </option>
        ))}
      </select>
      <input
        name="account"
        type="number"
        label="Amount"
        {...register('amount', { required: true })}
        className="col-span-3 h-8 sm:h-10 p-1 bg-gray border rounded-md border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        type="submit"
        disabled={!isValid}
        className="h-8 sm:h-10  border-transparent font-medium rounded bg-primary disabled:opacity-50 hover:opacity-90">
        +
      </button>
    </form>
  );
};

export default PayrollForm;
