import React, { useState, useEffect } from 'react';
import ReactMapGL, { Source, Layer, Marker, Popup } from 'react-map-gl';
import * as marData from '../../data/floodData.json';
import * as lines from '../../data/lines.json';
import fire from '../../config/Fire';
import swal from 'sweetalert';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const hosturl="https://whispering-atoll-97798.herokuapp.com"

export default function MapFlood() {

    const [viewport, setViewport] = useState({
        // center: [78.04263324487601, 30.32433658134211],
        latitude: 30.074,
        longitude: 79.217,
        width: "155vh",
        height: "80vh",
        zoom: 6.8
    });
    const [selectPoint, setSelectedPoint] = useState(null);
    const [setState, setSelectedState] = useState({ open: false });
    const [leak, setLeak] = useState({ value: 0 });
    const [cont, setCont] = useState({ value: 0 });
    const [damState, setDamState] = useState(null);
    const [valvestate, setValveState] = useState(null);
    const [flag, setFlag] = useState(0);
    const [flagValve, setFlagValve] = useState('a');

    useEffect(() => {

        window.setTimeout(() => {
            setLeak({ value: 1 });
            console.log(leak);
            // swal({
            //     text: "flood detected!",
            //     icon: "info"
            // });
        }, 7000);

        window.setTimeout(() => {
            setCont({ value: 1 });
            //console.log(leak);
        }, 9000);
        const db = fire.firestore()
        //window.setInterval(() => {
            const users = [];
            db.collection("dams").get().then(data => {
                data.forEach(doc=> {
                    console.log(doc.data().readings[0]);
                    users.push(doc.data().readings[0]);
                })
                console.log(users);
                setDamState(users);
            })
        //},2000)
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
    //flood control
    const floodChange = async (e) => {
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
            valveId: 'gc',
            "data": `${res_val}`    
        }
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
            const valve_Change = db.collection('dams').doc('d1');
            await valve_Change.update({
                valve: res_val
            }).then( () => {
                if(val==1){
                    toast("gate closed");
                }else{
                    toast("gate opened");
                }
                }).catch(err => toast("Error Occured"))
            
          }) // re-direct to client on successful creation
          .catch(err =>{
            toast(err.message);
            console.log(err.message);
          }
          );
    }
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
                    <div><span style={{ backgroundColor: "#ff0000" }}></span>High probability of flood</div>
                    <div><span style={{ backgroundColor: "#fff000" }}></span>Might occur flood</div>

                </div>

                {marData.features.map((point) => (

                    <Marker key={point.properties.title}
                        latitude={point.geometry.coordinates[1]}
                        longitude={point.geometry.coordinates[0]}
                        className={`
                            ${leak.value && point.properties.title == "Ramganga Dam" ? "mark" : ""}
                            ${cont.value && point.properties.title == "Dharma Valley" ? "cont" : ""}
                        `}
                    >
                        {point.properties.pic == "dam" ?
                            <div className="dam" onClick={(e) => {
                                e.preventDefault();
                                setSelectedPoint(point);
                            }}></div>
                            :
                            <div className="valley" onClick={(e) => {
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
                        <div>Turbidity:{selectPoint.properties.turbidity}</div> */}
                        {selectPoint.properties.title == 'Ramganga Dam' ?
                            <div>
                                <div className="table-info-wrapper">
                                    <div className="table-info-row">
                                        <div className="meta-info">
                                            <div className="meta-info-row">
                                                <b>{selectPoint.properties.title}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="table-info-wrapper">
                                    <div className="table-info-row">
                                        <div className="meta-info">
                                            <div className="meta-info-row">
                                                Water Level:
                                                <b>150 TMC</b>
                                            </div>
                                            <div className="meta-info-row">
                                                Temparature:
                                                <b>28°</b>
                                            </div>
                                            <div className="meta-info-row">
                                                Humidity:
                                                <b>65 %</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-info-wrapper">
                                    <div className="table-info-row">
                                        <div className="meta-info">
                                            <div className="meta-info-row">
                                                <b style={{ backgroundColor: "#e22929", color: "white" }}>There is high probability of occuring flood. Please alert all the people in this area to go to higher grounds or to safe shelters</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            : selectPoint.properties.title == "Prototype Dam" ?
                            //prototype dam popup
                                <div>
                                    <div className="table-info-wrapper">
                                        <div className="table-info-row">
                                            <div className="meta-info">
                                                <div className="meta-info-row">
                                                    <b>{selectPoint.properties.title}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-info-wrapper">
                                        <div className="">
                                            <div className="meta-info">
                                                <h4 className="panel-title"
                                                    onClick={function () {
                                                        console.log(setState.open);
                                                        setSelectedState({ open: !setState.open });
                                                    }} >
                                                    Catchment Area
                                            </h4>
                                            </div>
                                            <div className={setState.open ? "panel-collapse" : "panel-collapse panel-close"}
                                            >
                                                <ul className="list-group" >
                                                    <li className="list-group-item meta-info-row">Humidity <b>{damState[0].humidity}</b></li>
                                                    <li className="list-group-item meta-info-row">Temparature<b>{damState[0].temp}</b></li>
                                                    <li className="list-group-item meta-info-row">Water Level<b>{damState[0].us}</b></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-info-wrapper">
                                        <div className="table-info-row">
                                            <div className="meta-info">
                                                <div className="meta-info-row">
                                                    Water Level:
                                               <b>{damState[1].us}</b>
                                                </div>
                                                
                                                <div className="meta-info-row">
                                                    Gate
                                                    <div className="toggle-switch">
                                                        <input
                                                            type="checkbox"
                                                            className="toggle-switch-checkbox"
                                                            name="toggleSwitch"
                                                            defaultChecked="true"
                                                            onChange={(e) => floodChange(e)}
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
                                    {0>0 ?
                                    <div className="table-info-wrapper">
                                        <div className="table-info-row">
                                            <div className="meta-info">
                                                <div className="meta-info-row">
                                                    <b style={{ backgroundColor: "#e22929", color: "white" }}>There is high probability of occuring flood. Please alert all the people in this area to go to higher grounds or to safe shelters</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : "" }

                                </div>
                                :
                                <div>

                                    <div className="table-info-wrapper">
                                        <div className="table-info-row">
                                            <div className="meta-info">
                                                <div className="meta-info-row">
                                                    <b>{selectPoint.properties.title}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-info-wrapper">
                                        <div className="">
                                            <div className="meta-info">
                                                <h4 className="panel-title"
                                                    onClick={function () {
                                                        console.log(setState.open);
                                                        setSelectedState({ open: !setState.open });
                                                    }} >
                                                    Water Quality Parameters
                                            </h4>
                                            </div>
                                            <div className={setState.open ? "panel-collapse" : "panel-collapse panel-close"}
                                            >
                                                <ul className="list-group" >
                                                    <li className="list-group-item meta-info-row">ph <b>{selectPoint.properties.ph}</b></li>
                                                    <li className="list-group-item meta-info-row">Turbidity<b>{selectPoint.properties.turbidity}</b></li>
                                                    <li className="list-group-item meta-info-row">TDS<b>45 ppm</b></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-info-wrapper">
                                        <div className="table-info-row">
                                            <div className="meta-info">
                                                <div className="meta-info-row">
                                                    Water Level:
                                                <b>150 TMC</b>
                                                </div>
                                                <div className="meta-info-row">
                                                    Temparature:
                                                <b>28°</b>
                                                </div>
                                                <div className="meta-info-row">
                                                    Humidity:
                                                <b>65 %</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="table-info-wrapper">
                                    <div className="table-info-row">
                                        <div className="meta-info">
                                            <div className="meta-info-row">
                                                <b>There might be probability of occuring flood in this area so please be alerted</b>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                </div>
                        }
                    </Popup>
                ) : null}

            </ReactMapGL>
            <ToastContainer />
        </div>
    )
}