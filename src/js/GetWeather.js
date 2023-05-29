export async function getWeather(coords) {
    const weather_api = {
        password: '9jpHx1p2YM',
        username: 'rpsgroup_mcmanus'
    }

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(weather_api.username + ":" + weather_api.password));

    // Get Token for weather api auth.
    await fetch('https://login.meteomatics.com/api/v1/token', {
        method: 'GET', headers: headers
    }).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        var token = data.access_token;

        // Get Datetime
        const now = Date.now()
        const currentDate = new Date(now).toISOString()

        // Get weather data
        return fetch(
            `https://api.meteomatics.com/${currentDate}/t_2m:C/` +
            `${coords.lat},${coords.lng}/json?model=mix&access_token=${token}`
        )
            .then((res) => res.json())
            .then((data) => console.log(data));


    }).catch(function (err) {
        console.log('something went wrong', err);
    });
}

