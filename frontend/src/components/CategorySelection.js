import React from 'react';

const CategorySelection = ({
  searchCat,
  setSearchCat,
  setSearchRange,
  setSearchTime,
  setQueryRes
}) => {
  return (
    <fieldset className="categories">
      <legend>
        Please select the information you are interested in
      </legend>
      <div className="input-label">
        <input
          type="radio"
          id="arrived"
          name="category"
          value="arrived"
          checked={searchCat === 'arrived'}
          onChange={(e) => {
            setSearchCat(e.target.value);
            setQueryRes('');
          }}
        />
        <label htmlFor="arrived">Orders/vaccines arrived</label>
      </div>
      <div className="input-label">
        <input
          type="radio"
          id="vaccinated"
          name="category"
          value="vaccinated"
          checked={searchCat === 'vaccinated'}
          onChange={(e) => {
            setSearchCat(e.target.value);
            setQueryRes('');
          }}
        />
        <label htmlFor="vaccinated">Vaccinations given</label>
      </div>
      <div className="input-label">
        <input
          type="radio"
          id="perproducer"
          name="category"
          value="perproducer"
          checked={searchCat === 'perproducer'}
          onChange={(e) => {
            setSearchCat(e.target.value);
            setQueryRes('');
          }}
        />
        <label htmlFor="perproducer">Orders/vaccines per producer</label>
      </div>
      <div className="input-label">
        <input
          type="radio"
          id="expired"
          name="category"
          value="expired"
          checked={searchCat === 'expired'}
          onChange={(e) => {
            setSearchCat(e.target.value);
            setSearchRange('dateonly');
            setSearchTime('');
            setQueryRes('');
          }}
        />
        <label htmlFor="expired">Bottles expired</label>
      </div>
      <div className="input-label">
        <input
          type="radio"
          id="expired-injections"
          name="category"
          value="expired-injections"
          checked={searchCat === 'expired-injections'}
          onChange={(e) => {
            setSearchCat(e.target.value);
            setQueryRes('');
          }}
        />
        <label htmlFor="expired-injections">Wasted vaccines</label>
      </div>
      <div className="input-label">
        <input
          type="radio"
          id="valid-injections"
          name="category"
          value="valid-injections"
          checked={searchCat === 'valid-injections'}
          onChange={(e) => {
            setSearchCat(e.target.value);
            setQueryRes('');
          }}
        />
        <label htmlFor="valid-injections">Vaccines left</label>
      </div>
      <div className="input-label">
        <input
          type="radio"
          id="tobeexpired"
          name="category"
          value="tobeexpired"
          checked={searchCat === 'tobeexpired'}
          onChange={(e) => {
            setSearchCat(e.target.value);
            setQueryRes('');
          }}
        />
        <label htmlFor="tobeexpired">To expire in 10 days</label>
      </div>
    </fieldset>
  );
};

export default CategorySelection;