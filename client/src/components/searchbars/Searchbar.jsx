import React, { useState } from 'react';

export default function SearchBar({ data, setFilteredData }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);

    // Filter data based on the search query
    const filteredData = data.filter(item => {
      const indexMatch = item.uId.toLowerCase().includes(event.target.value.toLowerCase());
      const nameMatch = item.fullName.toLowerCase().includes(event.target.value.toLowerCase());
      const emailMatch = item.email.toLowerCase().includes(event.target.value.toLowerCase());
     

      return indexMatch || nameMatch || emailMatch ;
    });

    // Set the filtered data in the parent component (CustomerManage)
    setFilteredData(filteredData);
  };

  return (
    <div>
      <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          className="py-[5px] pl-7 pr-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none w-[400px]"
        />
    </div>
  );
}
