import React from 'react';
import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery , MenuItem , FormControl , InputLabel , Select} from '@material-ui/core';
import { RoomOutlined as LocationOnOutlinedIcon } from '@material-ui/icons';
import useStyles from './styles';
import useJsonData from '../useJsonData';

const Map = ({setChildClicked}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');
  const markers = useJsonData();
  const [zoom, setZoom] = useState(0);
  const [type,setType] = useState('Jan23');
  const [userLocation, setUserLocation] = useState(null);
  const [mapApi, setMapApi] = useState(null); 


  useEffect(() => {
    // Get the user's current location
    const askForLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          window.navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };

    askForLocation();
  }, []);

  const defaultCenter = userLocation || { lat: 28.7041, lng: 77.1025 };
  const mapOptions = {
    minZoom: 5,
  };

  const handleApiLoaded = (map, maps) => {
    // Store the map and maps objects in state
    setMapApi({ map, maps });

    // Zoom to user's current location if available
    if (userLocation) {
      const bounds = new maps.LatLngBounds();
      bounds.extend(new maps.LatLng(userLocation.lat, userLocation.lng));

      // Optional: Adjust zoom level (e.g., zoom in a bit more)
      const zoomLevel = 15;

      map.fitBounds(bounds);
      map.setZoom(zoomLevel);
    }
  };



  return (
    <div className={classes.mapContainer}>
      <Typography variant="h4">Map View</Typography>

      <FormControl className={classes.formControl}>
            <InputLabel>Reading</InputLabel>
                <Select value={type} onChange={(e)=> setType(e.target.value)}>
                    <MenuItem value="Jan23">Jan-23</MenuItem>
                    <MenuItem value="Nov22">Nov-22</MenuItem>
                    <MenuItem value="Aug22">Aug-22</MenuItem>
                    <MenuItem value="May22">May-22</MenuItem>
                </Select>
      </FormControl>

      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultCenter}
        center={defaultCenter}
        defaultZoom={10}
        margin={[50, 50, 50, 50]}
        onChange={(props) => setZoom(props.zoom)}
        options={mapOptions}
        onChildClick={(child)=>setChildClicked(child)}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            lat={marker.position.lat}
            lng={marker.position.lng}
            text={marker.title}
            value1={marker.value.value_Jan23}
            value2={marker.value.value_Nov22}
            value3={marker.value.value_Aug22}
            value4={marker.value.value_May22}
            zoom={zoom}
            selectedMonth={type}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};




const Marker = ({ text, value1, value2, value3, value4, zoom, lat, lng , type, selectedMonth}) => {
  const classes = useStyles();
  const [isHovered, setIsHovered] = React.useState(false);

  const getColor = (typeValue, minValue, maxValue) => {

    let value;
    switch (selectedMonth) {
      case 'Jan23':
        value = typeValue;
        break;
      case 'Nov22':
        value = value2;
        break;
      case 'Aug22':
        value = value3;
        break;
      case 'May22':
        value = value4;
        break;
      default:
        value = typeValue;
    }

    // Adjust the range of value to be between 0 and 1
    const normalizedValue = (value - minValue) / (maxValue - minValue);
  
    // Map the normalized value to a color range (e.g., from red to blue)
    const hue = 240 - normalizedValue * 240; // Hue ranges from 0 (blue) to 240 (red)
    const saturation = 100;
    const lightness = 50;
  
    // Convert HSL to RGB
    const rgbColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  
    return rgbColor;
  };
  
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', zIndex: isHovered ? 1 : 0 }}
    >
      <Circle lat={lat} lng={lng} radius={zoom/5} color={getColor(value1,1,65)} zoom={zoom} />
      <LocationOnOutlinedIcon fontSize="small" color="primary" />

      {isHovered && (
        <Paper elevation={3} className={classes.PaperHover}>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              width: '120px',
              textAlign: 'center',
              zIndex: 11,
            }}
          ><Typography
          variant="subtitle2"
          className={`${classes.Typography} ${selectedMonth === 'Jan23' ? classes.Selected : ''}`}
          gutterBottom
        >
          {text}
        </Typography>
        <Typography
              variant="subtitle2"
              className={selectedMonth === 'Jan23' ? classes.selected : ''}
              gutterBottom
            >
              Jan-23: {value1}
            </Typography>
            <Typography
              variant="subtitle2"
              className={selectedMonth === 'Nov22' ? classes.selected : ''}
              gutterBottom
            >
              Nov-22: {value2}
            </Typography>
            <Typography
              variant="subtitle2"
              className={selectedMonth === 'Aug22' ? classes.selected : ''}
              gutterBottom
            >
              Aug-22: {value3}
            </Typography>
            <Typography
              variant="subtitle2"
              className={selectedMonth === 'May22' ? classes.selected : ''}
              gutterBottom
            >
              May-22: {value4}
          </Typography>
          </div>
        </Paper>
      )}
    </div>
  );
};

const Circle = ({ lat, lng, radius, color, zoom }) => (
  <div
    style={{
      opacity: '0.5',
      position: 'absolute',
      width: 2 * radius * (zoom),
      height: 2 * radius * (zoom),
      backgroundColor: color,
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      left: `${lng-65}px`,
      top: `${lat-18}px`,
      zIndex: -1,
    }}
  />
);

export default Map;
