// General module for logging
const logInfo = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

const errorInfo = (...params) => {
  console.error(...params);
};


module.exports = {
  logInfo,
  errorInfo
};
