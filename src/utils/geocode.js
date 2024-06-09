const request = require('request');


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGlja3NvbmgiLCJhIjoiY2p4aTByNTl6MHd1YzN5bzhhbGpibHptdCJ9.5OYznwHacMI8c6228vJMoQ&limit=1`;

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services.', undefined);
        } else if (body.features.length === 0) {
            var errObj = 'Unable to find location';
            callback(errObj, undefined);
        } else {
            const res = body.features[0];
            callback(undefined, {
                latitude: res.center[1],
                longitude: res.center[0],
                location: res.place_name
            });
        }
    });
};

module.exports = geocode; 