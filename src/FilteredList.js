import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import './App.css';
import icon from './hamburger-icon.svg';
import cross from './cross.svg';



class FilteredList extends Component {
  static propTypes = {
    recommendedPlaces: PropTypes.array.isRequired,
    updateFilteredList:PropTypes.func.isRequired,
    menuItemClicked: PropTypes.func.isRequired
  };
  state ={
    query:'',
    filteredPlace:this.props.recommendedPlaces,
    toggleMenuClass:''
  }

  // updates the list
  changeList = (event) => {
    const query = event.target.value;
    this.setState({ query });
    if(this.state.query) {
      const match = new RegExp(escapeRegExp(query.trim()),'i')
      let filteredPlace = this.props.recommendedPlaces.filter((place) => match.test(place.venue.name));
      this.setState({ filteredPlace });
      this.props.updateFilteredList(filteredPlace);
    }
  }

  // This function will hide/show the side menu bar when hamburger icon or cross icon is clicked .
  toggleMenu = (event) => {
    if(this.state.toggleMenuClass === 'show')
     {
       this.setState({toggleMenuClass:''});
     }
    else {
      this.setState({toggleMenuClass: 'show'});
    }
  }

render()
{
  const query = this.state.query;
  const visibility=this.state.toggleMenuClass;
  let filteredPlace=this.props.recommendedPlaces;
  if(query !== '')
    {
      filteredPlace =this.state.filteredPlace;
    }
    return(
      <nav id='sideMenuContainer' className={visibility} aria-label="Menu">
            <div className='icon' onClick={this.toggleMenu} role='button' tabIndex={1}>
              { visibility === 'show'?(<img src={icon} alt='hamburger icon' className='icon hide'/>):(<img src={icon} alt='hamburger icon' className='icon'/>)}
            </div>
            <div className='cross' role='button' onClick={this.toggleMenu}>
                <img src={cross} alt='close icon' className='cross'/>
            </div>
              <input type='text' placeholder='Search..' value={query} aria-label='filter restaurant search bar' onChange={this.changeList} tabIndex={1}/>

              <ol className="sidebar">
                {
                  filteredPlace.map((place) =>
                  <li key={place.venue.name}
                  className='item'
                  id = {place.venue.name}
                  tabIndex={1}
                  onClick ={this.props.menuItemClicked.bind(this,place.venue.name)}
                  onKeyPress ={this.props.menuItemClicked.bind(this,place.venue.name)}
                  >
                    {place.venue.name}
                  </li>
                )
              }
              </ol>

      </nav>

    );
  }
}

export default FilteredList
