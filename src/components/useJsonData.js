import { useState, useEffect } from 'react';
import jsonData from './fetch_data/data.json';

const useJsonData = () => {
  const [markers, setMarkers] = useState([]);


  useEffect(() => {
    const extractedMarkers = jsonData.map(item => ({
      position: {
        lat: parseFloat(item.Latitude),
        lng: parseFloat(item.Longitude),
      },
      title: item.Site_Name,
      value: {
        value_Jan23: item['Jan-23'],
        value_Nov22: item['Nov-22'],
        value_Aug22: item['Aug-22'],
        value_May22: item['May-22'],
      },
      District_Name: item['District Name'],
      Tehsil_Name: item['Tehsil Name'],

      post_monsoon_depletion: parseFloat((item['Jan-23'] - item['Nov-22']).toFixed(3)),
      pre_monsoon_depletion: parseFloat((item['Aug-22'] - item['May-22']).toFixed(3)),
      nine_month_depletion_rate : parseFloat((item['Jan-23'] - item['May-22']).toFixed(3))
      
    }));
    console.log(extractedMarkers);
    
    setMarkers(extractedMarkers);
  }, []);

  return markers;
};

export default useJsonData;
