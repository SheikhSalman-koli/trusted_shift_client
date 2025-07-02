
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";


// Fix missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});


// const FlyToDistrict = ({ center, zoom }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (center) {
//       map.flyTo(center, zoom, {
//         duration: 2 // seconds
//       });
//     }
//   }, [center, zoom, map]);

//   return null;
// };



export default function Coverage() {

  const branches = useLoaderData()
  // console.log(branches);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBranches = branches.filter((branch) =>
    branch.region.toLowerCase().includes(searchTerm.toLowerCase())
  );
//   console.log(filteredBranches);

  return (
    <section className="py-16 px-4 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          We are available in 64 districts
        </h2>

        {/* Search Input */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Leaflet Map */}
        <MapContainer
          center={[23.685, 90.3563]} // Center of Bangladesh
          zoom={7}
          scrollWheelZoom={false}
          className="h-[800px] w-full rounded-xl shadow-md"
        >
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* <FlyToDistrict center={districtCenter} zoom={zoomLevel} /> */}

          {filteredBranches.map((branch, index) => (
            <Marker key={index} position={[branch.latitude, branch.longitude]}>
              <Popup>{branch.name} Branch</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
