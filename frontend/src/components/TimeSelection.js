import React from 'react';

const TimeSelection = ({
  searchRange,
  searchDate,
  searchTime,
  searchCat,
  setSearchDate,
  setSearchTime,
  setSearchRange
}) => {
  return (
    <fieldset className="timing">
      <legend>Please select range or a day and set the date and time</legend>
      <div className="radio-buttons">
        <div className="input-label">
          <input
            type="radio"
            id="dateonly"
            name="dayorrange"
            value="dateonly"
            checked={searchRange === 'dateonly'}
            onChange={(e) => {
              setSearchRange(e.target.value);
              setSearchTime('');
            }}
          />
          <label htmlFor="dateonly">This date only</label>
        </div>
        <div className="input-label">
          <input
            type="radio"
            id="range"
            name="dayorrange"
            value="range"
            checked={searchRange === 'range'}
            onChange={(e) => setSearchRange(e.target.value)}
            disabled={
              searchCat === 'expired' ||
              searchCat === 'expired-injections' ||
              searchCat === 'valid-injections' ||
              searchCat === 'tobeexpired'
            }
          />
          <label htmlFor="range">Until the date (including date)</label>
        </div>
      </div>
      <div className="input-no-label">
        <input
          type="date"
          id="total-date"
          name="total-date"
          onChange={(e) => setSearchDate(e.target.value)}
          value={searchDate}
        />
        <input
          type="time"
          id="total-time"
          name="total-time"
          onChange={(e) => setSearchTime(e.target.value)}
          value={searchRange === 'dateonly' ? '' : searchTime}
          disabled={searchRange === 'dateonly' || searchCat === 'expired'}
        />
      </div>
    </fieldset>
  );
};

export default TimeSelection;