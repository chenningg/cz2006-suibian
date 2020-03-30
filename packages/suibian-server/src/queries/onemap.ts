import { sendError } from "../sockets/helper/messaging";
import { suibianSocket } from "@suibian/commons/src";
import { httpStatus } from "../../../commons/src/httpStatus";
import axios from "axios";
// token expires every 3 days (31 March)
export const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQxMzUsInVzZXJfaWQiOjQxMzUsImVtYWlsIjoicmV1YmVuLndvbmcueXNAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNTg1MzgzMzU0LCJleHAiOjE1ODU4MTUzNTQsIm5iZiI6MTU4NTM4MzM1NCwianRpIjoiMzBlZTYzMWE5MWFmNDY3MWJlMDgyODU5OTU3Njk1NTgifQ.74NjL_ZneNslK6c6Hkh5FiQW1akVhg2_Vk5F8OSqA-I";

export async function getLatLonSocketless(postalcode: string) {
  let lat: string;
  let lon: string;
  let base_url = "https://developers.onemap.sg/";
  // return Geom for latlong, disabling additional information
  let search_url = `commonapi/search?searchVal=${postalcode}&returnGeom=Y&getAddrDetails=N&pageNum=PageNumber`;
  let query_url = base_url + search_url;
  try {
    const { data, status } = await axios.get(query_url);
    switch (status) {
      case 200:
        let latlonjson = data;
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
        console.log(" Searching: unknown query error");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getRouteDetailsSocketless(
  start_latlon: string,
  end_postal: string,
  token: string
) {
  const startLocationData = JSON.parse(start_latlon);
  const endLocationData = await getLatLonSocketless(end_postal);
  if (startLocationData && endLocationData) {
    // starting location passed in as JSON string
    const { start_lat, start_lon } = startLocationData;
    const [end_lat, end_lon] = endLocationData;

    let base_url = "https://developers.onemap.sg/";
    let route_url = `privateapi/routingsvc/route?start=${start_lat},${start_lon}&end=${end_lat},${end_lon}&routeType=drive&token=${token}`;
    let query_url = base_url + route_url;

    try {
      const { data, status } = await axios.get(query_url);
      switch (status) {
        case 200:
          let routingjson = data;
          if (routingjson["status_message"] === "Found route between points") {
            let travel_time: number =
              routingjson["route_summary"]["total_time"];
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
          console.log("Routing: unknown query error");
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export async function getLatLonSocket(
  postalcode: string,
  socket: suibianSocket
) {
  let lat: string;
  let lon: string;
  let base_url = "https://developers.onemap.sg/";
  // return Geom for latlong, disabling additional information
  let search_url = `commonapi/search?searchVal=${postalcode}&returnGeom=Y&getAddrDetails=N&pageNum=PageNumber`;
  let query_url = base_url + search_url;
  try {
    const { data, status } = await axios.get(query_url);
    switch (status) {
      case 200:
        let latlonjson = data;
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
        console.log("400 LatLon");
        sendError(socket, httpStatus.badRequest, "400 Bad Request LatLon");
        break;
      case 401:
        console.log("401 latlong");
        sendError(socket, httpStatus.unauthorized, "401 Unauthorised LatLon");
        break;
      case 404:
        console.log("404 latlong");
        sendError(socket, httpStatus.notFound, "404 Not Found LatLon");
        break;
      default:
        console.log("LatLon: unknown query error");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getRouteDetailsSocket(
  start_latlon: string,
  end_postal: string,
  token: string,
  socket: suibianSocket
) {
  const startLocationData = JSON.parse(start_latlon);
  const endLocationData = await getLatLonSocketless(end_postal);
  if (startLocationData && endLocationData) {
    const { start_lat, start_lon } = startLocationData;
    const [end_lat, end_lon] = endLocationData;

    let base_url = "https://developers.onemap.sg/";
    let route_url = `privateapi/routingsvc/route?start=${start_lat},${start_lon}&end=${end_lat},${end_lon}&routeType=drive&token=${token}`;
    let query_url = base_url + route_url;

    try {
      const { data, status } = await axios.get(query_url);
      switch (status) {
        case 200:
          let routingjson = data;
          if (routingjson["status_message"] === "Found route between points") {
            let travel_time: number =
              routingjson["route_summary"]["total_time"];
            let travel_distance: number =
              routingjson["route_summary"]["total_distance"];

            let travel_details = { travel_time, travel_distance };

            return JSON.stringify(travel_details);
          } else {
            console.log(routingjson["status_message"]);
          }
          break;
        case 400:
          console.log("400 Routing");
          sendError(socket, httpStatus.badRequest, "400 Bad Request Routing");
          break;
        case 401:
          console.log("401 Routing");
          sendError(
            socket,
            httpStatus.unauthorized,
            "401 Unauthorized Routing"
          );
          break;
        case 404:
          console.log("404 Routing");
          sendError(socket, httpStatus.notFound, "404 Not Found Routing");
          break;
        default:
          console.log("Routing: unknown query error");
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
