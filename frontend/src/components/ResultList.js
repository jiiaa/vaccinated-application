import React from 'react';

const ResultList = ({ category, result }) => {
  console.log(result);
  if (category === 'loading') {
    return (
      <div>
        Getting the data...
      </div>
    );
  }

  if (category === 'arrived' && result) {
    return (
      <div>
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
      <div>
        Injections given: {result[0].vaccinated}
      </div>
    );
  }

  if (category === 'perproducer' && result) {
    return (
      <div>
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
      <div>
        Bottles (orders) expired: {result[0].expired_bottles}
      </div>
    );
  }

  if (category === 'expired-injections' && result) {
    return (
      <div>
        Vaccines expired before usage: {result.expiredInjections}
      </div>
    );
  }

  if (category === 'valid-injections' && result) {
    return (
      <div>

      </div>
    );
  }

  // if (category === 'toexpire' && result) {
  //   return (
  //     <div>

  //     </div>
  //   );
  // }

  return null;
};

export default ResultList;