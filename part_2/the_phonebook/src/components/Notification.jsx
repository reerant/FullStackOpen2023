const Notification = ({ notificationMsg, errorMsg }) => {
  if (notificationMsg === null && errorMsg === null) {
    return null;
  }
  if (notificationMsg)
    return <div className="notification">{notificationMsg}</div>;
    
  return <div className="error">{errorMsg}</div>;
};

export default Notification;
