import React, { useState, useEffect } from 'react';
import ReactMapGL, { Source, Layer, Marker, Popup } from 'react-map-gl';
import * as marData from '../../data/uttarakhand-sih.json';
import * as lines from '../../data/lines.json';
import fire from '../../config/Fire';
import swal from 'sweetalert';

export default function Mapbox() {
    
    const [viewport, setViewport] = useState({
        // center: [78.04263324487601, 30.32433658134211],
        latitude: 30.3223,
        longitude: 78.043,
        width: "155vh",
        height: "80vh",
        zoom: 16.7
    });
    const [selectPoint, setSelectedPoint] = useState(null);
    const [leak, setLeak] = useState({value:0});
    const [cont, setCont] = useState({value:0});
    const [state, setState] = useState(null);

    
    useEffect( () => {
        
        window.setTimeout(() => {
            setLeak({value: 1});
            //console.log(leak);
            swal({
                text: "leak detected!",
                icon: "info"
            });
        }, 5000);

        window.setTimeout(() => {
            setCont({value: 1});
            //console.log(leak);
            swal({
                text: "water contamination detected!",
                icon: "info"
            });
        }, 7000);
    
        const db = fire.firestore()
        db.collection("nodes").get().then( snapshot => {
        const users = [];
        console.log(snapshot);
        snapshot.forEach(doc => {
            console.log(doc.data());
            users.push(doc.data())
          });
        //const values = snapshot.data();
        //const keys = Object.keys(snapshot.data());
        console.log(users.slice(-2,));
        setState(users.slice(-2,));
        })
        .catch(err => console.log(err));

        const listner = e => {
            if (e.key === "Escape") {
                setSelectedPoint(null);
            }
        }
        window.addEventListener("keydown", listner);

        return () => {
            window.removeEventListener("keydown", listner);
        }
    }, [])

    
    return (
        <div>
            <ReactMapGL {...viewport}
                mapboxApiAccessToken={"pk.eyJ1Ijoicm9oaXQ1MjIiLCJhIjoiY2s1OXA5bzc3MDB0YzNvbW0zZmQ4ZDk0eCJ9._tqjcpuZOcf8tDUUqLRpcw"}
                //mapStyle="mapbox://styles/rohit522/ck8zompbe0lb41irqlgfpm3od"
                mapStyle="mapbox://styles/rohit522/ck9e1ipju22jr1imtcgpbrmuq"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
                
            >
                <div id="state-legend" className="legend">
                    <div><span style={{backgroundColor: "#ff0000"}}></span>leak Detected</div>
                    <div><span style={{backgroundColor: "#fff000"}}></span>Detected Contaminants</div>
                    
                </div>
                {state? state.map((point) => (
                    console.log(point),
                    console.log(point.coordinates[1]),
                    console.log(point.readings.slice(-1)[0].pH)
                )) : ""}
                {marData.features.map((point) => (
                    
                    <Marker key={point.properties.title}
                        latitude={point.geometry.coordinates[1]}
                        longitude={point.geometry.coordinates[0]}
                        className={`
                            ${leak.value && point.properties.title=="DIV134"? "mark": ""}
                            ${cont.value && point.properties.title=="DIV121"? "cont": ""}
                        `}
                    >
                        
                        {point.properties.title=='Main'?
                            <div className="main" onClick={(e) => {
                                e.preventDefault();
                                setSelectedPoint(point);
                            }}></div>
                            :
                            <div className={point.properties.title=='Junction'? "junction": "marker"} onClick={(e) => {
                                e.preventDefault();
                                setSelectedPoint(point);
                            }}></div>
                        }
                        
                    </Marker>
                ))}
                {selectPoint ? (
                    
                    <Popup latitude={selectPoint.geometry.coordinates[1]}
                        longitude={selectPoint.geometry.coordinates[0]}
                        onClose={() => {
                            setSelectedPoint(null);
                        }}
                        closeOnClick={false}
                        className="mapboxgl-popup"
                    >
                        {/* <div className="mapboxgl-popup-content">{selectPoint.properties.title}</div>
                        <div>PH:{selectPoint.properties.ph}</div>
                        <div>Turbidity:{selectPoint.properties.turbidity}</div>
                        <div className="row">
                            <div style={{marginTop:"4px"}}>Valve: </div>
                            <div className="toggle-switch">
                                <input
                                    type="checkbox"
                                    className="toggle-switch-checkbox"
                                    name="toggleSwitch"
                                    value="true"
                                    defaultChecked={selectPoint.properties.valve}
                                    id="toggleSwitch"
                                />
                                <label className="toggle-switch-label" htmlFor="toggleSwitch">
                                <span className="toggle-switch-inner" />
                                <span className="toggle-switch-switch" />
                                </label>waterlevel,temp,humidity
                            </div>
                        </div> */}
                        {selectPoint.properties.title=='Junction'?
                            <div>
                            <div className="table-info-wrapper">
                                <div className="table-info-row">
                                    <div className="meta-info">
                                        <div className="meta-info-row">
                                            DeviceID
                                            <b>Junction</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="table-info-wrapper">
                                <div className="table-info-row">
                                    <div className="meta-info">
                                        
                                        <div className="meta-info-row">
                                            FlowRate: 
                                            <b>{selectPoint.properties.flowrate}</b>
                                        </div>
                                        <div className="meta-info-row">
                                            Valve
                                            <div className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    className="toggle-switch-checkbox"
                                                    name="toggleSwitch"
                                                    value="true"
                                                    defaultChecked={selectPoint.properties.valve}
                                                    id="toggleSwitch"
                                                />
                                                <label className="toggle-switch-label" htmlFor="toggleSwitch">
                                                <span className="toggle-switch-inner" />
                                                <span className="toggle-switch-switch" />
                                                </label>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                                
                        </div>
                            :
                            <div>
                                <div className="table-info-wrapper">
                                    <div className="table-info-row">
                                        <div className="meta-info">
                                            <div className="meta-info-row">
                                                DeviceID
                                                <b>{selectPoint.properties.title}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                                <div className="table-info-wrapper">
                                    <div className="table-info-row">
                                        <div className="meta-info">
                                            <div className="meta-info-row">
                                                PH: 
                                                <b>{selectPoint.properties.ph}</b>
                                            </div>
                                            <div className="meta-info-row">
                                                Turbidity: 
                                                <b>{selectPoint.properties.turbidity}</b>
                                            </div>
                                            <div className="meta-info-row">
                                                TDS: 
                                                <b>{selectPoint.properties.TDS}</b>
                                            </div>
                                            <div className="meta-info-row">
                                                FlowRate: 
                                                <b>{selectPoint.properties.flowrate}</b>
                                            </div>
                                            <div className="meta-info-row">
                                                Valve
                                                <div className="toggle-switch">
                                                    <input
                                                        type="checkbox"
                                                        className="toggle-switch-checkbox"
                                                        name="toggleSwitch"
                                                        value="true"
                                                        defaultChecked={selectPoint.properties.valve}
                                                        id="toggleSwitch"
                                                    />
                                                    <label className="toggle-switch-label" htmlFor="toggleSwitch">
                                                    <span className="toggle-switch-inner" />
                                                    <span className="toggle-switch-switch" />
                                                    </label>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                                    
                            </div>
                        }
                        
                        
                    </Popup>
                ) : null}
                
            </ReactMapGL>
        </div>
    )
}