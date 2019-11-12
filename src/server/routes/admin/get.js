const getAdminHandler = (req, res) => {
  res.json({
    message: 'Hello to an admin!',
  });
};

export default getAdminHandler;
