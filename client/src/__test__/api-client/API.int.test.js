import * as config from "../../components/config/config"
require('es6-promise').polyfill();
global.fetch=require('isomorphic-fetch');

import API from '../../components/api-client/API'

describe("Integration Test API Call", ()=>{
    
    /*
    beforeAll(() => {
        console.log('before all run.')
    });

    afterAll(() => {
        console.log('after all run.')
    });

    beforeEach(() => {
        console.log('before each run.')
    });

    afterEach(() => {
        console.log('after each run.')
    });
    */
  

    it("Test DarkSky time machine", async ()=>{
        const myConfig = {
            exclude: "exclude=flags,minutely,hourly,alerts",
            proxyUrl: "https://cors-anywhere.herokuapp.com",
            darkSkyUrl: "https://api.darksky.net/forecast",
        }
       const response = await fetch(`${myConfig.darkSkyUrl}/${config.apiKey}/38.8473,-77.0588,1529185473?exclude=flags,currently,minutely,hourly,alerts`);
       const currentWeather = await response.json();
       expect(currentWeather).toMatchSnapshot();
    })
})