export async function getWeather(coords) {
    const weather_api = {
        password: '9jpHx1p2YM',
        username: 'rpsgroup_mcmanus'
    }

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(weather_api.username + ":" + weather_api.password));

    const tokenres = await fetch('https://login.meteomatics.com/api/v1/token', {
        method: 'GET', headers: headers
    })

    const token = await tokenres.json()
    const weatherData = await fetchWeather(token.access_token, coords)
    console.log(weatherData);
    return weatherData
}

async function fetchWeather(token, coords) {
    // Get Datetime
    const now = Date.now()
    const currentDate = new Date(now).toISOString()

    // Get weather data
    const weatherRes = await fetch(
        `https://api.meteomatics.com/${currentDate}/t_2m:C/` +
        `${coords.lat},${coords.lng}/json?model=mix&access_token=${token}`
    )
    let weatherData = await weatherRes.json()
    return weatherData
}


export async function fetchCity(coords) {

    const coords_api = 'prj_test_pk_859c74fe66361118ee45c0dd19c72605c56d8a94'

    let headers = new Headers();
    headers.set('Authorization', coords_api);

    const cityRes = await fetch(`https://api.radar.io/v1/geocode/reverse?coordinates=${coords.lat}%2C${coords.lng}`, {
        method: 'GET', headers: headers
    })

    const city = await cityRes.json()
    return city
}

