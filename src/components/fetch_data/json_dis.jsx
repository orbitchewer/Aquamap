// App.js
import React, { useState, useEffect } from 'react';
import jsonData from './data.json';


const Json = () => {
  const [data, setData] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    setData(jsonData);

    const extractedCoordinates = jsonData.map(item => ({
      Latitude: parseFloat(item.Latitude),
      Longitude: parseFloat(item.Longitude),
    }));
    setCoordinates(extractedCoordinates);
  }, []);

  return (
    <div>
      <h1>React Web Page</h1>
      <table>
        <thead>
          <tr>
            <th>Site Name</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>May-22</th>
            <th>Aug-22</th>
            <th>Nov-22</th>
            <th>Jan-23</th>
            <th>Pz/DW</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.Site_Name}>
              <td>{item.Site_Name}</td>
              <td>{typeof item.Longitude === 'object' ? 'N/A' : item.Longitude}</td>
              <td>{typeof item.Latitude === 'object' ? 'N/A' : item.Latitude}</td>
              <td>{item['May-22']}</td>
              <td>{item['Aug-22']}</td>
              <td>{item['Nov-22']}</td>
              <td>{item['Jan-23']}</td>
              <td>{item['Pz/DW']}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
    </div>
  );
};

export default Json;
