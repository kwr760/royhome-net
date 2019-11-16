import Logger from '../logger';

const displayMessage = (msg) => () => Logger.log(msg);

export default displayMessage;
