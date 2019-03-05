import React, { Component } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { mapToken } from "../../data/tokens/tokens.js";

class Mape extends Component {
  state = {
    position: [5.505, 10]
  };
  updateMap = () => {
    const { map, mapContainer } = this.refs;
    if (map) map.leafletElement.invalidateSize();
    if (mapContainer) this.refs.mapContainer.classList.add("show");
  };
  render() {
    return (
      <div id="map-container" ref="mapContainer">
        <Map center={this.state.position} zoom={13} ref="map">
          <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
            maxZoom="18"
            id="mapbox.streets"
            accessToken={mapToken}
          />
          <Marker position={this.state.position} />
        </Map>
      </div>
    );
  }
  componentDidMount = () => {
    setTimeout(this.updateMap, 1500);
  };
}

export default Mape;
