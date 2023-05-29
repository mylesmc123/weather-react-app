import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import { getWeather } from '../js/GetWeather'

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(139.753);
    const [lat] = useState(35.6844);
    const [zoom] = useState(14);
    const [API_KEY] = useState('G28Wx0TEh00gRJifwBmD');

    useEffect(() => {
        if (map.current) return; //stops map from intializing more than once
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom
        });

        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

        // new maplibregl.Marker({ color: "#FF0000" })
        //     .setLngLat([139.7525, 35.6846])
        //     .addTo(map.current);

        map.current.on('click', function (e) {
            const coords = e.lngLat
            async function getWeatherData(coords) {
                let weatherData = await getWeather(coords)
                return weatherData
            }
            let weatherData = getWeatherData(coords)
            console.log(weatherData);

            // console.log(weather.data[0].coordinates[0].dates[0].value);
            // console.log(weather.data)
            var popup = new maplibregl.Popup({ closeOnClick: true })
                .setLngLat(coords)
                .setHTML('<h1>Hello World!</h1>')
                .addTo(map.current);

            // console.log(weatherData);
        })
        // setMarker(e.latlng);


    });



    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}