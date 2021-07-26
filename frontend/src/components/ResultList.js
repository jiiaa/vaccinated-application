import React from 'react';

const ResultList = ({ category, result }) => {

  if (category === 'loading') {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (category === 'arrived') {
    return (
      <div>
        <div>
          Orders arrived: {result.count}
        </div>
        <div>
          Vaccines arrived: {result.sum}
        </div>
      </div>
    );
  }

  if (category === 'vaccinated') {
    return (
      <div>
        Injections given: {result.vaccinated}
      </div>
    );
  }

  // if (category === 'perproducer') {
  //   return (
  //     <div>

  //     </div>
  //   );
  // }

  // if (category === 'expired') {
  //   return (
  //     <div>

  //     </div>
  //   );
  // }

  // if (category === 'expired-injections') {
  //   return (
  //     <div>

  //     </div>
  //   );
  // }

  // if (category === 'valid-injections') {
  //   return (
  //     <div>

  //     </div>
  //   );
  // }

  // if (category === 'toexpire') {
  //   return (
  //     <div>

  //     </div>
  //   );
  // }

  return null;
};

export default ResultList;