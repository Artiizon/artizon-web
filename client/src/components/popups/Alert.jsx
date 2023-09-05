

const Alert = ({ isOpen, onClose, message }) => {
  const handleReload = () => {
    window.location.reload(); // Reload the page when the "Close" button is clicked
  };

  return (
    <div className={`alert-popup ${isOpen ? 'open' : ''}`}>
      <div className="alert-popup-content">
        <div className="alert-popup-header">
          <h2>Access Denied</h2>
          <button className="close-button" onClick={handleReload}>
            &times;
          </button>
        </div>
        <div className="alert-popup-body">
          <p>{message}</p>
        </div>
        <div className="alert-popup-footer">
          <button className="alert-close-button" onClick={handleReload}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
