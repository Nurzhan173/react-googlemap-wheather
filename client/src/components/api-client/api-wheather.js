import axios from "axios";

export async function getWheaterDeg() {
    const config = {
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/weather?q=Almaty&appid=2ffb005c6b34b5d92ce415395a0761a3',
        headers: {}
    };

    const response = await axios(config);

    return await response.data;

}