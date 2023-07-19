import React, { useState } from "react";
import "./CustomTimePicker.css"; // Import the custom CSS for styling

const CustomTimePicker = ({ value, onChange }) => {
  const [isPickerOpen, setPickerOpen] = useState(false);

  const handleInputChange = (e) => {
    // Your custom logic for handling input change, if needed
    onChange(e.target.value);
  };

  return (
    <div className="custom-time-picker">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setPickerOpen(true)}
        onBlur={() => setPickerOpen(false)}
      />
      {isPickerOpen && (
        <div className="time-picker-dropdown">
          {/* Your custom time picker dropdown content */}
          {/* You can use libraries like react-time-picker here */}
        </div>
      )}
    </div>
  );
};

export default CustomTimePicker;
