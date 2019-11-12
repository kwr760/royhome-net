const getPrivateHandler = (req, res) => {
  res.json({
    message: 'Hello from a private API!',
  });
};

export default getPrivateHandler;
