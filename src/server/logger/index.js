class Logger {
  log = (msg) => {
    console.log(msg);
  };

  warning = (msg) => {
    console.warn(msg);
  };

  error = (msg) => {
    console.error(msg);
  };
}

export default new Logger();
