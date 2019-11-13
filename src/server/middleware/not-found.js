import { NOT_FOUND } from 'http-status-codes';

const notFound = (req, res) => {
  console.error('Endpoint was not found');
  return res.sendStatus(NOT_FOUND);
};

export default notFound;
