import React, { useState } from 'react'
import "./weather.css"

// tutorial now att 9:00 min mark 
// https://www.youtube.com/watch?v=uZGhTYZ6eys

function Weather() {

    const weather_api = {
        pw: '9jpHx1p2YM',
        user: 'rpsgroup_mcmanus'
    }

    // https://radar.com/dashboard?project=646edc9681f4e3006db54025&live=false
    const coords_api = 'prj_test_pk_859c74fe66361118ee45c0dd19c72605c56d8a94'

    const [form, setForm] = useState({
        city: "",
        country: "",
    })

    async function weatherData(e) {
        e.preventDefault()
        if (form.city === "") {
            alert("Add City")
        } else {
            const data = await fetch
        }
    }

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        if (name === "city") {
            setForm({ ...form, city: value })
        }

        if (name === "country") {
            setForm({ ...form, country: value })
        }

        console.log(form.city, form.country);
    }


    return (
        <div className='weather' >
            <span className='title'>Weather App</span>
            <br />
            <form>
                <input type="text" name="city" placeholder="city" onChange={e => handleChange(e)} />
                &nbsp; &nbsp; &nbsp; &nbsp;
                <input type="text" name="country" placeholder="country" onChange={e => handleChange(e)} />
                <button className='getweather'>Submit</button>
            </form>
        </div >
    )
}

export default Weather