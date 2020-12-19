import React, { useState, useEffect } from 'react';
import ReactMapGL, { Source, Layer, Marker, Popup } from 'react-map-gl';
import * as marData from '../../data/uttarakhand-sih.json';
import * as lines from '../../data/lines.json';
import fire from '../../config/Fire';
import swal from 'sweetalert';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setEmitFlags } from 'typescript';

const hosturl="https://whispering-atoll-97798.herokuapp.com"

export default function Mapbox() {
    
    const [viewport, setViewport] = useState({
        // center: [78.04263324487601, 30.32433658134211],
        latitude: 30.3223,
        longitude: 78.043,
        width: "156vh",
        height: "80vh",
        zoom: 16.7
    });
    const [selectPoint, setSelectedPoint] = useState(null);
    const [leak, setLeak] = useState(0);
    const [cont, setCont] = useState({value:0});
    const [state, setState] = useState(null);
    const [valvestate, setValveState] = useState(null);
    const [flag, setFlag] = useState(0);
    const [flagValve, setFlagValve] = useState('a');

    
    useEffect( () => {
        
        // window.setTimeout(() => {
        //     setLeak({value: 1});
        //     //console.log(leak);
        //     swal({
        //         text: "leak detected!",
        //         icon: "info"
        //     });
        // }, 5000);

        // window.setTimeout(() => {
        //     setCont({value: 1});
        //     //console.log(leak);
        //     swal({
        //         text: "water contamination detected!",
        //         icon: "info"
        //     });
        // }, 7000);
    
        const db = fire.firestore()
        window.setInterval(() => {
            db.collection("globals").doc('values').get().then(data => {
                console.log(data.data().current_leaks);
                if(data.data().current_leaks >0){
                    setLeak(1);
                }else{
                    setLeak(0);
                }
                console.log(leak);
            })
        },2000)
        
        db.collection("nodes").get().then( snapshot => {
        const users = [];
        console.log(snapshot);
        snapshot.forEach(doc => {
            console.log(doc.data(),doc.id);
            if(doc.id != "a1"){
                users.push(doc.data())
            }
          });
        setState(users);
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

    const valveChange = async (e) => {
        e.preventDefault();
        let val;
        const title = e.target.title;
        console.log(flag,valvestate)
        //let temValve = flagValve
        if(flag == 0 || title!=flagValve){
            setValveState(e.target.value)
            setFlag(1)
            setFlagValve(title)
            val = e.target.value
        }else{
            val = valvestate
        }
        console.log(flag,valvestate)
        //let val = e.target.value;
        let res_val;
        if(val==0){
            res_val = 1
        }else{
            res_val = 0
        }
        console.log(val,res_val);
        const valveData = {
            valveId: `${title}`,
            "data": `${res_val}`    
        }
        console.log(valveData)
        //to remove
        // const db = fire.firestore()
        // const valve_Change = db.collection('nodes').doc(`${title}`);
        // await valve_Change.update({
        //     valve: res_val
        // }).then( () => {
        //     setValveState(res_val)
        //     if(val==1){
        //         toast("valve stopped");
        //     }else{
        //         toast("valve opened");
        //     }
        // })
        // .catch(err => toast("Error Occured"))
        await axios.post(hosturl+"/api/v1/valve-data/valve-status", valveData)
            .then(async (res)  => {
            console.log(res);
            const db = fire.firestore()
            const valve_Change = db.collection('nodes').doc(`${title}`);
            await valve_Change.update({
                valve: res_val
            }).then( () => {
                if(val==1){
                    toast("valve stopped");
                }else{
                    toast("valve opened");
                }
                }).catch(err => toast("Error Occured"))
            
          }) // re-direct to client on successful creation
          .catch(err =>{
            toast(err.message);
            console.log(err.message);
          }
          );
    }
    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [78.04318791391518, 30.323505933525098],
                        [78.04286068425279, 30.322501109129504]
                    ]
                }
            }
        ]
      };
    return (
        <div>
            <ReactMapGL {...viewport}
                mapboxApiAccessToken={"pk.eyJ1Ijoicm9oaXQ1MjIiLCJhIjoiY2s1OXA5bzc3MDB0YzNvbW0zZmQ4ZDk0eCJ9._tqjcpuZOcf8tDUUqLRpcw"}
                //mapStyle="mapbox://styles/rohit522/ck9e1ipju22jr1imtcgpbrmuq"
                mapStyle="mapbox://styles/rohit522/ckhgkri281k6v19mdcxx30vjx"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
                
            >
                <div id="state-legend" className="legend">
                    <div><span style={{backgroundColor: "#ff0000"}}></span>leak Detected</div>
                    <div><span style={{backgroundColor: "#fff000"}}></span>Detected Contaminants</div>
                    
                </div>
                {leak? 
                <Source id="my-data" type="geojson" data={geojson}>
                    <Layer
                        id="route"
                        type="line"
                        paint={{
                            'line-color': 'red',
                            'line-width': 8
                          }}
                    />
                </Source> : ""}
                {/* {state? state.map((point) => (
                    console.log(point),
                    console.log(point.coordinates)
                )) : ""} */}
                {state? state.map((point) => (
                    console.log(point),
                    <Marker key={point.title}
                        latitude={parseFloat(point.coordinates[1])}
                        longitude={parseFloat(point.coordinates[0])}
                        className={`
                            ${leak.value && point.title=="u1"? "mark": ""}
                            ${cont.value && point.title=="u2"? "cont": ""}
                        `}
                    >
                        
                        {point.title=='r1'?
                            <div className="main" onClick={(e) => {
                                e.preventDefault();
                                setSelectedPoint(point);
                            }}></div>
                            :
                            <div className={point.title=='j1'? "junction": "marker"} onClick={(e) => {
                                e.preventDefault();
                                setSelectedPoint(point);
                            }}></div>
                        }
                        
                    </Marker>
                )) : ""}
                {selectPoint ? (
                    
                    <Popup latitude={parseFloat(selectPoint.coordinates[1])}
                        longitude={parseFloat(selectPoint.coordinates[0])}
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
                        {selectPoint.title=='j1'?
                            <div>
                            <div className="table-info-wrapper">
                                <div className="table-info-row">
                                    <div className="meta-info">
                                        <div className="meta-info-row">
                                            DeviceID
                                            <b>j1</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="table-info-wrapper">
                                <div className="table-info-row">
                                    <div className="meta-info">
                                        
                                        <div className="meta-info-row">
                                            FlowRate: 
                                            <b>{selectPoint.readings.slice(-1)[0].FR}</b>
                                        </div>
                                        <div className="meta-info-row">
                                            Valve
                                            <div className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    className="toggle-switch-checkbox"
                                                    name="toggleSwitch"
                                                    value={selectPoint.valve}
                                                    
                                                    defaultChecked={selectPoint.valve}
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
                                                <b>{selectPoint.title}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                                <div className="table-info-wrapper">
                                    <div className="table-info-row">
                                        <div className="meta-info">
                                            <div className="meta-info-row">
                                                PH: 
                                                <b>{selectPoint.readings.slice(-1)[0].ph}</b>
                                            </div>
                                            <div className="meta-info-row">
                                                Turbidity: 
                                                <b>{selectPoint.readings.slice(-1)[0].turb}</b>
                                            </div>
                                            {/* <div className="meta-info-row">
                                                TDS: 
                                                <b>{selectPoint.readings.slice(-1)[0].TDS}</b>
                                            </div> */}
                                            <div className="meta-info-row">
                                                FlowRate: 
                                                <b>{selectPoint.readings.slice(-1)[0].FR}</b>
                                            </div>
                                            <div className="meta-info-row">
                                                Valve
                                                <div className="toggle-switch">
                                                    <input
                                                        type="checkbox"
                                                        className="toggle-switch-checkbox"
                                                        name="toggleSwitch"
                                                        value={selectPoint.valve}
                                                        onChange={(e) => valveChange(e)}
                                                        defaultChecked={selectPoint.valve}
                                                        title={selectPoint.title}
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
            <ToastContainer />
        </div>
    )
}