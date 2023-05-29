import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import { getWeather, fetchCity } from '../js/GetWeather'

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

            // let weatherData = getWeather(coords)
            // console.log(weatherData.data);
            getWeather(coords)
                .then(data => {
                    console.log(data.data[0].coordinates[0].dates[0]);
                    const weatherHTML = `<p>Date: ${data.data[0].coordinates[0].dates[0].date}<br />Temperature C: ${data.data[0].coordinates[0].dates[0].value}<p />`
                    fetchCity(coords)
                        .then(data => {
                            console.log(data.addresses[0].state);
                            const locationHTML = `<h4>${data.addresses[0].city}, ${data.addresses[0].state}, ${data.addresses[0].country}</h4>`
                            // const popupHTML = `<p>Date: ${data.data[0].coordinates[0].dates[0].date}</p>`
                            var popup = new maplibregl.Popup({ closeOnClick: true })
                                .setLngLat(coords)
                                .setHTML(locationHTML + weatherHTML)
                                .addTo(map.current);
                        })

                });
        })
        // setMarker(e.latlng);


    });



    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}