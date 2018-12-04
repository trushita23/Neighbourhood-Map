import React from 'react';
import { Map, GoogleApiWrapper,Marker,InfoWindow } from 'google-maps-react';
import './App.css';

const mapStyles = {
  width: '100%',
  height: '100%',
  position:'relative'

};

const MapComponent = (props) => {

   const {google,showingInfoWindow,activeMarker,markerRef,selectedPlace,filteredPlace} = props;
   return (
        <Map
             google={google}
             zoom={14}
             style={mapStyles}
             initialCenter={{
               lat:18.530892,
               lng:73.863609
             }}
             onClick={props.closeInfoWindow}
           >
           {
            // Adding Markers of recommended places on Map. Recommended places data is from FOURSQUARE API.
            filteredPlace.map( (place,referralId) =>
             <Marker
               onClick={props.onMarkerClick.bind(this)}
               key={place.referralId}
               position = {{ lat: place.venue.location.lat,
                            lng: place.venue.location.lng
                           }}
                title={place.venue.name}
                address = {place.venue.location.address}
                ref={markerRef}
                animation={(activeMarker) ? (place.venue.name === activeMarker.title ? '1' : '0') : '0'}
              />

            )
          }
            {
            <InfoWindow
              marker ={activeMarker}
              onClose={props.closeInfoWindow}
              visible={showingInfoWindow}>
                <div className='infoWindowText'>
                  <h1>{selectedPlace.title}</h1>
                  <h2>{selectedPlace.address}</h2>
                </div>
            </InfoWindow>
          }
           </Map>
      );

 }

 export default GoogleApiWrapper({
   apiKey: ('AIzaSyAH7WMeBjsclRO2xs_ZqcTXNWjplSXoVks')
 })(MapComponent);
