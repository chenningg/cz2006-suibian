import { sendError } from "../sockets/room";
import { suibianSocket } from "@suibian/commons/src";
import { httpStatus } from "../../../commons/src/httpStatus";
import { XMLHttpRequest } from "xmlhttprequest-ts";
// token expires every 3 days (31 March)
export const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQxMzUsInVzZXJfaWQiOjQxMzUsImVtYWlsIjoicmV1YmVuLndvbmcueXNAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNTg1MzgzMzU0LCJleHAiOjE1ODU4MTUzNTQsIm5iZiI6MTU4NTM4MzM1NCwianRpIjoiMzBlZTYzMWE5MWFmNDY3MWJlMDgyODU5OTU3Njk1NTgifQ.74NjL_ZneNslK6c6Hkh5FiQW1akVhg2_Vk5F8OSqA-I";

export function getLatLon(postalcode: string, socket: suibianSocket) {
  let lat: string;
  let lon: string;
  let request = new XMLHttpRequest();
  let base_url = "https://developers.onemap.sg/";
  // return Geom for latlong, disabling additional information
  let search_url = `commonapi/search?searchVal=${postalcode}&returnGeom=Y&getAddrDetails=N&pageNum=PageNumber`;
  request.open("GET", base_url + search_url, false); // false sets request to be synchronous
  request.send();

  switch (request.status) {
    case 200:
      let latlonjson = JSON.parse(request.responseText);
      if (latlonjson["found"] > 0) {
        lat = latlonjson["results"][0]["LATITUDE"];
        lon = latlonjson["results"][0]["LONGITUDE"];

        return [lat, lon];
      } else {
        let error = "No results found, check postal code again!";
        console.log(error);
        sendError(socket, httpStatus.notFound, error);
      }
      break;
    case 400:
      sendError(socket, httpStatus.badRequest, "400 Bad Request");
      break;
    case 401:
      sendError(
        socket,
        httpStatus.unauthorized,
        "401 Unauthorized, check token"
      );
      break;
    case 404:
      sendError(socket, httpStatus.notFound, "404 Not Found");
      break;
    default:
      console.log("Unknown query error");
  }
}

export function getRouteDetails(
  start_postal: string,
  end_postal: string,
  token: string,
  socket: suibianSocket
) {
  const startLocationData = getLatLon(start_postal, socket);
  const endLocationData = getLatLon(end_postal, socket);
  if (startLocationData && endLocationData) {
    const [start_lat, start_lon] = startLocationData;
    const [end_lat, end_lon] = endLocationData;

    let base_url = "https://developers.onemap.sg/";
    let route_url = `privateapi/routingsvc/route?start=${start_lat},${start_lon}&end=${end_lat},${end_lon}&routeType=drive&token=${token}`;
    let query_url = base_url + route_url;

    let request = new XMLHttpRequest();
    request.open("GET", query_url, false);
    request.send();

    switch (request.status) {
      case 200:
        let routingjson = JSON.parse(request.responseText);
        if (routingjson["status_message"] === "Found route between points") {
          console.log(routingjson["status_message"]);
          let travel_time: number = routingjson["route_summary"]["total_time"];
          let travel_distance: number =
            routingjson["route_summary"]["total_distance"];

          let travel_details = { travel_time, travel_distance };

          return JSON.stringify(travel_details);
        } else {
          console.log(routingjson["status_message"]);
        }
        break;
      case 400:
        sendError(socket, httpStatus.badRequest, "400 Bad Request");
        break;
      case 401:
        sendError(
          socket,
          httpStatus.unauthorized,
          "401 Unauthorized, check tocken"
        );
        break;
      case 404:
        sendError(socket, httpStatus.notFound, "404 Not Found");
        break;
      default:
        console.log("Unknown query error");
        break;
    }
  }
}

export function getLatLonSocketless(postalcode: string) {
  let lat: string;
  let lon: string;
  let request = new XMLHttpRequest();
  let base_url = "https://developers.onemap.sg/";
  // return Geom for latlong, disabling additional information
  let search_url = `commonapi/search?searchVal=${postalcode}&returnGeom=Y&getAddrDetails=N&pageNum=PageNumber`;
  request.open("GET", base_url + search_url, false); // false sets request to be synchronous
  request.send();

  switch (request.status) {
    case 200:
      let latlonjson = JSON.parse(request.responseText);
      if (latlonjson["found"] > 0) {
        lat = latlonjson["results"][0]["LATITUDE"];
        lon = latlonjson["results"][0]["LONGITUDE"];

        return [lat, lon];
      } else {
        let error = "No results found, check postal code again!";
        console.log(error);
      }
      break;
    case 400:
      console.log("400 latlong");
      break;
    case 401:
      console.log("401 latlong");
      break;
    case 404:
      console.log("404 latlong");
      break;
    default:
      console.log("Unknown query error");
  }
}

export function getRouteDetailsSocketless(
  start_postal: string,
  end_postal: string,
  token: string
) {
  const startLocationData = getLatLonSocketless(start_postal);
  const endLocationData = getLatLonSocketless(end_postal);
  if (startLocationData && endLocationData) {
    const [start_lat, start_lon] = startLocationData;
    const [end_lat, end_lon] = endLocationData;

    let base_url = "https://developers.onemap.sg/";
    let route_url = `privateapi/routingsvc/route?start=${start_lat},${start_lon}&end=${end_lat},${end_lon}&routeType=drive&token=${token}`;
    let query_url = base_url + route_url;

    let request = new XMLHttpRequest();
    request.open("GET", query_url, false);
    request.send();

    switch (request.status) {
      case 200:
        let routingjson = JSON.parse(request.responseText);
        if (routingjson["status_message"] === "Found route between points") {
          console.log(routingjson["status_message"]);
          let travel_time: number = routingjson["route_summary"]["total_time"];
          let travel_distance: number =
            routingjson["route_summary"]["total_distance"];

          let travel_details = { travel_time, travel_distance };

          return JSON.stringify(travel_details);
        } else {
          console.log(routingjson["status_message"]);
        }
        break;
      case 400:
        console.log("400 routing");
        break;
      case 401:
        console.log("401 latlong");
        break;
      case 404:
        console.log("404 latlong");
        break;
      default:
        console.log("Unknown query error");
        break;
    }
  }
}

console.log(getRouteDetailsSocketless("639798", "289877", token));
