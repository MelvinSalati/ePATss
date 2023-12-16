import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import {
  List,
  FlexboxGrid,
  Avatar,
  AvatarGroup,
  Toggle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  Drawer,
  Input,
  IconButton,
  InputGroup,
} from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseMedicalCircleCheck,
  faCircle,
  faPlugCirclePlus,
  faMagnifyingGlass,
  faWifi,
  faThumbtack,
  faPersonWalking,
  faVenusMars,
  faMapLocationDot,
  faBell,
  faUser,
  faArrowRightArrowLeft,
  faArrowLeft,
  faFolderTree,
  faCalendarDays,
  faPlugCircleBolt,
  faPlugCircleXmark
} from '@fortawesome/free-solid-svg-icons';

import ProgressBar from 'react-bootstrap/ProgressBar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import initials from 'initials';
import Streams from '../../components/Streams/';
import EyeCloseIcon from '@rsuite/icons/EyeClose';
import Http from '../../../Http/Http.js'
import routes from '../../../Routes/URLs.js';
import authorizeAccess from "../../../Functions/authorizeAccess.js";
import Notiflix from 'Notiflix';
import PlusIcon from '@rsuite/icons/Plus';
import { Spinner } from "react-activity";
import "react-activity/dist/library.css"
//streams enroolled  in

const streamsEnrolledFields  =  [
  {
    displayName: 'SN',
    inputFilterable: false,
    name: 'sn'
  },
  {
    displayName: 'Stream',
    inputFilterable: false,
    name: 'stream_name'
  },
  {
    displayName: 'Created On',
    inputFilterable: false,
    name: 'created_at'
  },
  {
    displayName: '',
    inputFilterable: false,
    name: '',
    render: (props)=> {
      return <>
        <IconButton icon={<PlusIcon/>} appearance="primary">Select</IconButton>
      </>
    }
  }
];

export function PatientScreen(props) {

  const [key, setKey] = useState('home');

  const location = useLocation();

  const avatarData = initials(location.state.fname + "," + location.state.lname);
  const [allowRescheduling, setAllowRescheduling] = useState(false);
  const [openStreamsDrawer, setOpenStreamsDrawer] = useState(false);
  const [patientStreams, setPatientStreams]       = useState([]);

  const navigate           =  useNavigate();

  const [streamsList, setStreamsList]             = useState([]);

  const searchScreenHandler = () => {
    navigate('/HomeScreen')
  }

  const handleToggleChange = (checked) => {
    // You can perform additional logic here if needed
    setAllowRescheduling(checked);
  };

  const [filter, setFilter] = useState('');

 useEffect (()=>{
   async function fetchStreams () {
       try {
         const response = await Http.get(routes.streams.list);
         setStreamsList(response.data);
         console.log(response.data)
       } catch (error) {
         // Handle the error (e.g., display an error message)
         console.error(error.message);
       }
   }
   fetchStreams();
 },[]);

const addStream  = async () => {
  try
  {
    const response = await Http.post(routes.streams.add,{
      id: location.state.id,
    });

  } catch(error){
    console.log(error)
  }
}

const enrollPatientInStream   = async (streamId) => {
  console.log(location)
  try {
    const response =  await Http.post(routes.streams.enroll,{
      patient: location.state.id,
      stream: streamId,
     })
     Notiflix.Notify.success("Patient enrolled in the Stream");
     setOpenStreamsDrawer(false);
  } catch (error) {
    // error handling
    Notiflix.Notify.failure(error.response.data.msg);
    console.log(error)
  }
}

  return <>
    {/*    ptient prodile*/}
     <FlexboxGrid>
        <FlexboxGrid.Item colspan={18}></FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={6}>
        <Button appearance="subtle" size="xs" onClick={searchScreenHandler}>Back </Button>
        </FlexboxGrid.Item>
     </FlexboxGrid>
    <section id="patientDetails">
    <Button className="">Back</Button>
      <div className="personalDetails">

        <FlexboxGrid>
          <FlexboxGrid.Item colspan={6}>
            <div className="profileImage">
              <div className="profile">
                <Avatar style={{ background: '#000' }} circle size={"lg"}>
                  {avatarData}
                </Avatar>
              </div>
              <h4 style={{ fontWeight: 400, textAlign: 'center' }}>{location.state.fname} {"   "}  {location.state.lname}</h4>
              <div style={{ padding: 10, display: 'flex', flexDirection: 'row' }}>

              </div>
              <div style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                <span style={{ float: 'center', padding: '10px 10px' }}>Adherence Rate <br />
                  <ProgressBar now={60} style={{ height: 8 }} /> </span>
              </div>
            </div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={18}>
            <div className="data">
              <div className="data-segments">
                <h6 style={{ padding: 10, color: '#000' }}> <FontAwesomeIcon icon={faUser} color={"#007bFF"} /> Profile Details</h6>
                <div className="segment-items">
                  <span className="segment-item" >Gender  : <strong>{location.state.gender}</strong></span>
                  <span className="segment-item">Date of Birth  : <strong>{location.state.dob}</strong></span>
                  <span className="segment-item">Mobile Phone Number  : <strong>{location.state.gender}</strong></span>
                </div>
              </div>

              <div className="data-segments">
                <h6 style={{ padding: 10, color: '#000' }}> <FontAwesomeIcon icon={faBell} color={"#007bFF"} />     Notifications Type</h6>
                <div className="segment-items">
                  <span className="segment-item" >Gender  : <strong>{location.state.gender}</strong></span>
                  <span className="segment-item">Date of Birth  : <strong>{location.state.gender}</strong></span>
                  <span className="segment-item">Mobile Phone Number  : <strong>{location.state.gender}</strong></span>
                </div>
              </div>
              <div className="data-segments">
                <h6 style={{ padding: 10, color: '#000' }}><FontAwesomeIcon icon={faMapLocationDot} color={"#007bFF"} />    Location Information</h6>
                <div className="segment-items">
                  <span className="segment-item">GPS Longitude : <strong>13.01234</strong></span>
                  <span className="segment-item">GPS Latitude  : <strong>13.01234</strong></span>
                                     <span className="segment-item" >Allow Rescheduling : <strong>
                                       <Toggle
                                        checked={allowRescheduling} onChange={handleToggleChange} color="green" />
                                     </strong></span>
                </div> </div>
            </div>

          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    </section>
    <section style={{marginTop: 0,height:'100%'}} className="bg-white ">
       <Tabs
            id="tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="streams" title={<div><FontAwesomeIcon icon={faFolderTree} /> Streams</div>}>
              <div style={{padding:20}}>
              <h5 style={{borderBottom:"1px solid #ddd"}}>Current Streams     <Button onClick={()=>{setOpenStreamsDrawer(true)}} size="sm" appearance="primary" className="float-end"><FontAwesomeIcon icon={faFolderTree}/>  Register In Stream</Button>
                                                                                     </h5>
             </div>
             <Spinner />
            </Tab>
            <Tab eventKey="appointments" title={<div> <FontAwesomeIcon icon={faCalendarDays} />   Appointments</div>}>

            </Tab>
            <Tab eventKey="tracking" title={<div><FontAwesomeIcon icon={faPersonWalking} /> Tracking</div>} >
              Tab content for Contact
            </Tab>
              <Tab eventKey="Remote Access" title={<div><FontAwesomeIcon icon={faThumbtack} /> Remote Access</div>} >
                          Tab content for Contact
                        </Tab>
                          <Tab eventKey="dhs" title={<div><FontAwesomeIcon icon={faWifi} /> Mobile Health Services (DHS)</div>} >
                                      Tab content for Contact
                                    </Tab>
          </Tabs>
    </section>

{/*      Drawer for showing streams */}
  <Drawer open={openStreamsDrawer} onClose={() => setOpenStreamsDrawer(false)} style={{width:420}}>
        <Drawer.Header>
          <Drawer.Title>Streams</Drawer.Title>

        </Drawer.Header>
        <Drawer.Body style={{padding:0}}>
           <div>
              <InputGroup style={{ marginTop:5}}>
              <InputGroup.Button>
                                <FontAwesomeIcon icon={faPlugCirclePlus} color="#007bFF"/>
                              </InputGroup.Button>
                <Input placeholder="Search filter"  />
                <InputGroup.Button>
                  <FontAwesomeIcon icon={faMagnifyingGlass} color="#0007bFF"/>
                </InputGroup.Button>
              </InputGroup>
           </div>
           {streamsList.map((item) => (
             <Accordion key={item.sn}>
               <Accordion.Item eventKey={item.sn}>
                 <Accordion.Header className="bg-white" style={{fontWeight:400}}>{item.stream_name}</Accordion.Header>
                 <Accordion.Body className="accordionCustom">
                   {/** Data storage **/}
                   <ListGroup defaultActiveKey="#art">
                     <ListGroup.Item action className="accordionCustomItem  bg-white border-0 text-muted"
                     onClick={()=>{
                       enrollPatientInStream(item.id);
                     }} >
                       <FontAwesomeIcon icon={faPlugCirclePlus} /> Initiate Stream
                     </ListGroup.Item>
                     <ListGroup.Item action href="#link2" disabled>
                       <FontAwesomeIcon icon={faPlugCircleBolt} /> Continue Stream
                     </ListGroup.Item>
                     <ListGroup.Item action href="#link2" disabled className="accordionCustomItem  bg-white border-0 text-danger">
                       <FontAwesomeIcon icon={faPlugCircleXmark} /> Stop Stream
                     </ListGroup.Item>
                   </ListGroup>
                 </Accordion.Body>
               </Accordion.Item>
             </Accordion>
          ))}

        </Drawer.Body>
      </Drawer>
  </>
}
