import React, { useState } from 'react'
import "./weather.css"

// tutorial now att 9:00 min mark 
// https://www.youtube.com/watch?v=uZGhTYZ6eys

function Weather() {

    const weather_api = {
        password: '9jpHx1p2YM',
        username: 'rpsgroup_mcmanus'
    }
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(weather_api.username + ":" + weather_api.password));



    // https://radar.com/dashboard?project=646edc9681f4e3006db54025&live=false
    // const coords_api = 'prj_test_pk_859c74fe66361118ee45c0dd19c72605c56d8a94'

    const [form, setForm] = useState({
        latitude: "",
        longitude: "",
    })

    async function weatherData(e) {
        e.preventDefault()
        if (form.latitude === "") {
            alert("Add latitude")
        } else if (form.longitude === "") {
            alert("Add longitude")
        } else {
            // Get Token for weather api auth.
            const token = await fetch('https://login.meteomatics.com/api/v1/token', {
                method: 'GET', headers: headers
            }).then(function (resp) {
                return resp.json();
            }).then(function (data) {
                var token = data.access_token;
                // console.log('token', token);
                return fetch(`https://api.meteomatics.com/2023-05-26T00:00:00Z/t_2m:C/${form.latitude},${form.longitude}/json?model=mix&access_token=${token}`
                ).then(
                    res => console.log(res.json())
                )
            }).catch(function (err) {
                console.log('something went wrong', err);
            });
        }
    }

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        if (name === "latitude") {
            setForm({ ...form, latitude: value })
        }

        if (name === "longitude") {
            setForm({ ...form, longitude: value })
        }

        console.log(form.latitude, form.longitude);
    }


    return (
        <div className='weather' >
            <span className='title'>Weather App</span>
            <br />
            <form>
                <input type="text" name="latitude" placeholder="latitude" onChange={e => handleChange(e)} />
                &nbsp; &nbsp; &nbsp; &nbsp;
                <input type="text" name="longitude" placeholder="longitude" onChange={e => handleChange(e)} />
                <button className='getweather' onClick={e => weatherData(e)}>Submit</button>
            </form>
        </div >
    )
}

export default Weather