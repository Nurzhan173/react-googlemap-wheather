import API, { getConfig } from '../../components/api-client/API'

describe("Test API Call", ()=>{

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
 
    it("Test api call getWeatherByDate success", async ()=>{
        const myConfig = {           
            exclude: "exclude=flags,minutely,hourly,alerts",
            proxyUrl: "https://cors-anywhere.herokuapp.com",
            darkSkyUrl: "https://api.darksky.net/forecast",
        }
        const coord = {lat: 38.8473, long: -77.0588}
        const currentWeather = await API.getWeatherByDate(coord, new Date(), myConfig)
        expect(currentWeather).toMatchSnapshot();
    })
})