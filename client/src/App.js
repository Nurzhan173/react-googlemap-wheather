import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/screens/home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1
            className="App-title"
            style={{ float: "left", marginTop: "20px" }}
          >
            
          </h1>
        </header>
        <Home />
        <footer
          style={{
            height: "60px",
            backgroundColor: "#272727",
            padding: "10px",
            marginTop: "100px"
          }}
        >
          {/* <div style={{ float: "right", marginRight: "30px" }}>
            <img
              src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_linux-512.png"
              style={{ width: "50px", height: "50px", marginRight: "5px" }}
              alt="facebook logo"
            />
            <img
              src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-512.png"
              style={{ width: "50px", height: "50px" }}
              alt="facebook logo"
            />
          </div> */}

          <div
            style={{
              float: "left",
              fontSize: "13px",
              marginTop: "45px",
              color: "white",
              fontStyle: "italic"
            }}
          >
            {/* Please note Free DarkSky API is limited to 1000 calls/per day. */}
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
