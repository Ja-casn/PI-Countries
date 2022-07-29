import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import CountryDetail from './components/Country-Detail/CountryDetail';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import './CountriesApp.css'


const CountriesApp = () => {
  return (
    <BrowserRouter>
        {/* <Route path='/'><LandingPage /> </Route> */}
      <div className="mainDiv">
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/countries' component={Home} />
        <Route exact path='/countries/:idCountry' component={CountryDetail} />
      </div>
    </BrowserRouter>
  );
}

export default CountriesApp;
