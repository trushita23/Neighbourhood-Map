import React, {Component} from 'react';
import MapComponent from './MapComponent';
import FilteredList from './FilteredList';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    recommendedPlaces: [],
    windowHasClosed: false,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    filteredPlace: [],
    errMsg:'',
    markers: []
  }
  componentDidMount() {
    this.getAllLocations();
  }

  // using foursquare API to fetch Restaurant details and store all resturant details in a state "recommendedPlaces" and "filteredPlace". filteredPlace should initially show the entire list.
  getAllLocations = () => {
    const urlRequest = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "HRTMHZ2PNVEHIQCNOCC05QMDQR0N0TIZFZJ3KTS5Q4MVPFEJ",
      client_secret: "YAZ3FY5A0KURNVSOIFAPAAMOH5SY4X0O2ODH5WVPZP4JLG1P",
      query: "food",
      near: "pune",
      limit: "6",
      v: "20182507"
    }
    axios.get(urlRequest + new URLSearchParams(parameters))
      .then((response) => {
        this.setState({
          recommendedPlaces: response.data.response.groups[0].items,
          filteredPlace: response.data.response.groups[0].items
        });
      }).catch(error => {
        alert("OOPS! There is a problem loading the page. Please Try Again after sometime!")
      })
  }

  // This function is called when the side menu is clicked. This will animate the icon and display the InfoWindow for the resturant clicked on.
  menuItemClicked = (placeName) => {
    const clickedMarker = this.state.markers.filter((marker) => marker.props.title === placeName);
    this.onMarkerClick(clickedMarker[0].props, clickedMarker[0].marker);
  }

  // This function is called when user clicks on side menubar resaturant list or Marker icon. It maintains the state of showingInfoWindow and animates the marker icon.
  onMarkerClick = (props, marker) => {
    console.log('props', props);
    console.log('marker', marker);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      windowHasClosed: false,
    })
  }

  //store all the markers
  markerRef = (ref) => {
    if (ref !== null) {
      this.setState(prevState => ({
        markers: [...prevState.markers, ref]
      }));
    }
  }


  // This function closes the info window when the user either click on cross icon in showingInfoWindow or clicks anywhere on the map.
  closeInfoWindow = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  // This function filters the side menu bar list according to the text entered in search input box.
  updateFilteredList = (list) => {
    this.setState({
      filteredPlace: list
    })
  }


  render() {
    const {
      recommendedPlaces,
      showingInfoWindow,
      activeMarker,
      selectedPlace,
      filteredPlace
    } = this.state;
    return (
        <div className = "App" >
          <header className = "App-header" >
            <h1> Restaurants in Pune, India. </h1>
          </header>
          <FilteredList recommendedPlaces = {this.state.recommendedPlaces} menuItemClicked = {this.menuItemClicked} updateFilteredList = {this.updateFilteredList}/>
          <div className = "content" aria-label="Map" role="application" >
            <MapComponent
              recommendedPlaces = {recommendedPlaces}
              showingInfoWindow = {showingInfoWindow}
              activeMarker = {activeMarker}
              markerRef = {this.markerRef}
              selectedPlace = {selectedPlace}
              filteredPlace = {filteredPlace}
              onMarkerClick = {this.onMarkerClick}
              closeInfoWindow = {this.closeInfoWindow}
              updateFilteredList = {this.updateFilteredList} />
          </div>
        </div>
    );
  }
}

export default App;
