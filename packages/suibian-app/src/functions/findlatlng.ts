export function findlatlng() {
  // finds the current browser's lat and lng values and parse into json
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      displayLocationInfo,
      handleLocationError,
      { timeout: 20000, enableHighAccuracy: true, maximumAge: 0 }
    );
  } else {
    alert("Geolocation is not supported by your browser");
  }
}

function displayLocationInfo(position) {
  let latlng = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  let jsonlatlng: string = JSON.stringify(latlng);
  let parsejson = JSON.parse(jsonlatlng);

  console.log(`latitude: ${parsejson.lat} | longitude: ${parsejson.lng}`);
}

function handleLocationError(error) {
  switch (error.code) {
    case 3:
      // ...deal with timeout
      console.log("Timeout");
      navigator.geolocation.getCurrentPosition(
        displayLocationInfo,
        handleLocationError
      );
      break;
    case 2:
      // ...device can't get data
      alert("Unable to retrieve data");
      break;
    case 1:
      // ...user said no ☹️
      alert("Unable to get user's location");
  }
}

//An integer ID that identifies the registered handler.
//navigator.geolocation.watchPosition(success[, error[, options]])
//succes - A callback function that takes a GeolocationPosition object as an input parameter.
//error (Optional)- An optional callback function that takes a GeolocationPositionError object as an input parameter.
//options (Optional) - An optional PositionOptions object that provides configuration options for the location watch.
//Returns An integer ID that identifies the registered handler. The ID can be passed to the Geolocation.clearWatch() to unregister the handler.
const watcher = navigator.geolocation.watchPosition(displayLocationInfo);

//navigator.geolocation.clearWatch(id);
//id - The ID number returned by the Geolocation.watchPosition() method when installing the handler you wish to remove.
setTimeout(() => {
  navigator.geolocation.clearWatch(watcher);
}, 15000);
