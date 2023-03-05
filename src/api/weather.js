const apiKey = 'b559f0cdc0798e9dd3f0e41a00ab7a33';

function cleanResponse(responseJson) {
    let { main: allData } = responseJson;
    let keysToInclude = ['temp', 'feels_like', 'temp_min', 'temp_max', 'humidity'];
    let filteredEntries = Object.entries(allData).filter(([key, value]) => {
        return keysToInclude.includes(key);
    });
    let filteredResponse = Object.fromEntries(filteredEntries);

    //get name of location and current time
    filteredResponse.location = responseJson.name;
    function returnWithLeadingZero(number) {
        return number < 10 ? `0${number}` : number;
    }
    let date = new Date();
    let hour = returnWithLeadingZero(date.getHours());
    let minutes = returnWithLeadingZero(date.getMinutes());
    let day = returnWithLeadingZero(date.getDate());
    let month = returnWithLeadingZero(date.getMonth() + 1);
    let year = date.getFullYear();

    filteredResponse.time = `${hour}:${minutes}, ${day}/${month}/${year}`;

    return filteredResponse;
}

export async function getWeatherResponse(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    return await new Promise((resolve, reject) => {
        try {
            fetch(url, {
                method: 'GET'
            }).then(res => {
                if (res.status == 200) {
                    resolve(res.json());
                } else {
                    reject({ error: 'Invalid HTTP response code!' });
                }
            }).catch(err => {
                reject({ error: err })
            });
        } catch (err) {
            reject({ error: err });
        }
    }).then(response => {
        return cleanResponse(response);
    });
};