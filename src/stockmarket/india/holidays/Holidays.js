import React, { useState, useEffect } from 'react';

const HolidayList = () => {
  const [holidays, setHolidays] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch('https://www.nseindia.com/api/holiday-master?type=trading');
        if (!response.ok) {
          throw new Error('Failed to fetch holidays');
        }
        const data = await response.json();
        setHolidays(data);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <div>
      <h2>Holidays List</h2>
      {holidays && Object.entries(holidays).map(([marketSegment, holidayData]) => (
        <div key={marketSegment}>
          <h3>{marketSegment}</h3>
          <ul>
            {holidayData.map(holiday => (
              <li key={holiday.Sr_no}>
                <strong>Date:</strong> {holiday.tradingDate},
                <strong> Weekday:</strong> {holiday.weekDay},
                <strong> Description:</strong> {holiday.description.trim()}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HolidayList;
