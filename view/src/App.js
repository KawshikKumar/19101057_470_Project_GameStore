import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";

function App() {
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","chilanka"],
      }
    })
  },[])
  return (
     <Router>   
        <Routes>
        <Route extact path="/" component={Home}/>
        </Routes>
        <Footer/>
        <Home/>
    </Router>

  );
}

export default App;
