import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 

const icon = L.icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [35, 45], 
    iconAnchor: [15, 15] 
});

const LocationComponent = ({lat, lon}) => {

    const center = [lat, lon];
    const ZOOMLEVEL = 16;

    return ( 

        <div className="mt-10 h-full w-5/6 flex flex-col bg-primary-white mb-10 rounded-xl justify-center">
            <h3 className="text-2xl font-semibold mb-4">Location on map</h3>
            <div className="map">
                <MapContainer center={center} zoom={ZOOMLEVEL} style={{ height: "200px", width: "100%"}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={center} icon={icon}>
                        <Popup>
                            Details
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
     
    );
}
 
export default LocationComponent;