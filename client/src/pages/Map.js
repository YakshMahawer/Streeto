import React, {useState, useEffect} from "react";
import axios from 'axios';
import tt from '@tomtom-international/web-sdk-maps';

//sPB3DIPAmdGNClOQHp3IZtglGcGyfWDw
const Map = () => {
    //This is seaching location on TomTom using seach box and it give all alike searches
    // const [searchTerm, setSearchTerm] = useState('');
    // const [searchResults, setSearchResults] = useState([]);
  
    // const handleSearch = async () => {
    //   try {
    //     const response = await axios.get('https://api.tomtom.com/search/2/search/' + searchTerm + '.json', {
    //       params: {
    //         key: 'sPB3DIPAmdGNClOQHp3IZtglGcGyfWDw' // Replace 'YOUR_API_KEY' with your actual API key
    //       }
    //     });
    //     setSearchResults(response.data.results);
    //   } catch (error) {
    //     console.error('Error searching:', error);
    //   }
    // };

    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [destination, setDestination] = useState({ lat: 22.3072, lon: 73.1812 });

    useEffect(() => {
        const mapInstance = tt.map({
        key: 'sPB3DIPAmdGNClOQHp3IZtglGcGyfWDw', // Replace 'YOUR_API_KEY' with your actual TomTom API key
        container: 'map-container',
        center: [73.1812, 22.3072], // Vadodara coordinates
        zoom: 16
        });
        setMap(mapInstance);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setUserLocation({
                  lat: position.coords.latitude,
                  lon: position.coords.longitude
                });
              },
              (error) => {
                console.error('Error getting user location:', error);
                // Handle error gracefully
              }
            );
          } else {
            console.error('Geolocation is not supported by this browser.');
            // Handle unsupported browser
          }
        return () => {
        // Cleanup
        mapInstance.remove();
        };
    }, []);

    useEffect(() => {
        if (map && userLocation) {
          // Make a request to TomTom Directions API to get the route
          const apiKey = 'sPB3DIPAmdGNClOQHp3IZtglGcGyfWDw';
          const apiUrl = `https://api.tomtom.com/routing/1/calculateRoute/${userLocation.lat},${userLocation.lon}:${22.3072},${73.1812}/json?key=${apiKey}`;
          
          axios.get(apiUrl)
            .then(response => {
              console.log('API Response:', response.data); // Log the response data for debugging
      
              const legs = response.data.routes[0].legs;
              if (!legs || legs.length === 0) {
                console.error('No legs found in the response');
                return;
              }
      
              const routeCoordinates = legs.flatMap(leg => {
                if (leg.points) {
                  return leg.points.map(point => [point.longitude, point.latitude]);
                }
                return [];
              });
      
              if (routeCoordinates.length === 0) {
                console.error('No coordinates found in route legs');
                return;
              }
      
               // Add a source for the layer
        map.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: routeCoordinates
              }
            }
          });
  
          // Draw route on the map
          map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route', // Set source for the layer
            layout: {
              'line-cap': 'round',
              'line-join': 'round'
            },
            paint: {
              'line-color': '#0000FF',
              'line-width': 6
            }
          });
        })
        .catch(error => {
          console.error('Error calculating route:', error);
        });
        }
      }, [map, userLocation]);

    const calculateDistance = () => {
        if (!userLocation) return;
        
        // Calculate distance using Haversine formula
        const R = 6371e3; // Earth radius in meters
        const φ1 = userLocation.lat * Math.PI / 180;
        const φ2 = destination.lat * Math.PI / 180;
        const Δφ = (destination.lat - userLocation.lat) * Math.PI / 180;
        const Δλ = (destination.lon - userLocation.lon) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // Distance in meters

        console.log('Distance:', distance.toFixed(2), 'meters');
    };
    return(
        <div className="map">
            Map
            <div id="map-container" style={{ width: '100%', height: '400px' }}></div>
            <button onClick={calculateDistance}>Calculate Distance</button>
            {/* This is seaching location on TomTom using seach box and it give all alike searches */}
            {/* <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {searchResults.map((result, index) => (
                <li key={index}>{result.address.freeformAddress}</li>
                ))}
            </ul> */}
        </div>
    )
}

export default Map;