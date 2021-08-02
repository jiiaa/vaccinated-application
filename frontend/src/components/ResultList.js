import React from 'react';

const ResultList = ({ category, result }) => {

  if (category === 'error') {
    return (
      <div className="error">
        <div>
          Ooops...something went wrong.
        </div>
        <div>
          {result.message}
        </div>
      </div>
    );
  }

  if (category === 'arrived' && result) {
    return (
      <div className="result">
        <div>
          Orders arrived: {result[0].orders}
        </div>
        <div>
          Vaccines arrived: {result[0].injections}
        </div>
      </div>
    );
  }

  if (category === 'vaccinated' && result) {
    return (
      <div className="result">
        Injections given: {result[0].vaccinated}
      </div>
    );
  }

  if (category === 'perproducer' && result) {
    return (
      <div className="result">
        {result.map(producer =>
          <>
            <div><strong>{producer.vaccine}</strong></div>
            <div>Orders arrived: {producer.orders}</div>
            <div>Injections arrived: {producer.injections}</div>
          </>
        )}
      </div>
    );
  }

  if (category === 'expired' && result) {
    return (
      <div className="result">
        Bottles (orders) expired: {result[0].expired_bottles}
      </div>
    );
  }

  if (category === 'expired-injections' && result) {
    return (
      <div className="result">
        Vaccines expired before usage: {result.expiredInjections}
      </div>
    );
  }

  if (category === 'valid-injections' && result) {
    return (
      <div className="result">
        Vaccines left to use: {result.validInjections}
      </div>
    );
  }

  if (category === 'tobeexpired' && result) {
    return (
      <div className="result">
        Vaccines to expire in next 10 days: {result[0].valid_injections}
      </div>
    );
  }

  return null;
};

export default ResultList;