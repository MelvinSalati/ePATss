import {useNavigate} from 'react-router-dom';
import React,{useState} from 'react';
import MenuIcon from '@rsuite/icons/Menu';
import OffIcon from '@rsuite/icons/Off';
import EyeCloseIcon from '@rsuite/icons/EyeClose'
import SearchIcon from '@rsuite/icons/Search';
import CalendarIcon from '@rsuite/icons/Calendar';
import MessageIcon from '@rsuite/icons/Message';
import ScatterIcon from '@rsuite/icons/Scatter';
import DragableIcon from '@rsuite/icons/Dragable';
import PeoplesIcon from '@rsuite/icons/Peoples';
import TaskIcon from '@rsuite/icons/Task';
import PeopleBranchIcon from '@rsuite/icons/PeopleBranch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faUser, faPhone, faEnvelope, faIdCardClip, faFingerprint, faMagnifyingGlass, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import {FlexboxGrid , IconButton, Drawer } from 'rsuite';

export function Navigation () {
  const navigate           = useNavigate();
  const [open, setOpen ]   = useState(false);

  const openMenuDrawer     = (state) => {
    setOpen(state);
  }

  return <>
  <div className="topNavigation" style={{ boxShadow: " 0px 2px 4px rgba(0, 0, 0, 1)", borderBottom: '1px solid #eee' }}>
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={4}>
        <div className="menuIcon">
          <MenuIcon color="#007aff" size="5em" style={{ fontSize: 50, padding: 10,  }} onClick={() => openMenuDrawer(true)} />
        </div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={12}><div style={{textAlign: 'center'}}></div></FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <div className="btnSignOut">
          <IconButton icon={<OffIcon style={{ backgroundColor: '#000', color: '#FFf',float: 'right' }} />} placement={"right"} style={{ backgroundColor: '#000', color: '#FFf', borderRadius: 25, float: 'right' }} appearance="default" size="sm" color="black">Sign Out</IconButton>
        </div>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </div>

  <Drawer open={open} placement="left" onClose={() => openMenuDrawer(false)} style={{ width: 500, }}>
         <Drawer.Header >
           <Drawer.Title className="drawerTitle">Applications</Drawer.Title>
           <Drawer.Actions>
             <IconButton className="closeButton" icon={<EyeCloseIcon style={{ backgroundColor: "#0007AFF" }} />} onClick={() => setOpen(false)} size={"sm"} appearance="primary" color="red" >
               Hide Menu
             </IconButton>
           </Drawer.Actions>
         </Drawer.Header>
         <Drawer.Body style={{ padding: 0, backgroundColor: "#fbfbfb" }}>
           <FlexboxGrid style={{marginTop:60}}>
             <FlexboxGrid.Item colspan={8}>
               <div className="menuItem"  onClick={()=>{navigate('/HomeScreen')}}>
                 {/* menu iocn*/}
                 <SearchIcon className="iconMenu" size="lg"/>
                 {/* menu title*/}
                 <h5 className="menuText" style={{ fontWeight: 400, color: "#000" }}>Search</h5>
               </div>
             </FlexboxGrid.Item>

             <FlexboxGrid.Item colspan={8}>
               <div className="menuItem">
                 {/* menu iocn*/}
                 <CalendarIcon className="iconMenu" />
                 {/* menu title*/}
                 <h5 className="menuText">Schedules</h5>
               </div>
             </FlexboxGrid.Item>
             <FlexboxGrid.Item colspan={8}>
               <div className="menuItem">
                 {/* menu iocn*/}
                 <MessageIcon className="iconMenu" />
                 {/* menu title*/}
                 <h5 className="menuText">Alerts</h5>
               </div>
             </FlexboxGrid.Item>
           </FlexboxGrid>
           <FlexboxGrid>
             <FlexboxGrid.Item colspan={8}>
               <div className="menuItem">
                 {/* menu iocn*/}
                 <TaskIcon className="iconMenu" />
                 {/* menu title*/}
                 <h5 className="menuText">Tracking</h5>
               </div>
             </FlexboxGrid.Item>

             <FlexboxGrid.Item colspan={8}>
               <div className="menuItem">
                 {/* menu iocn*/}
                 <DragableIcon className="iconMenu" />
                 {/* menu title*/}
                 <h5 className="menuText">Migration</h5>
               </div>
             </FlexboxGrid.Item>
             <FlexboxGrid.Item colspan={8}>
               <div className="menuItem">
                 {/* menu iocn*/}
                 <ScatterIcon className="iconMenu" />
                 {/* menu title*/}
                 <h5 className="menuText">Extractions</h5>
               </div>
             </FlexboxGrid.Item>
           </FlexboxGrid>
           <FlexboxGrid>
             <FlexboxGrid.Item colspan={8}>

             </FlexboxGrid.Item>
             <FlexboxGrid.Item colspan={8}>
               <div className="menuItem" onClick={()=>{navigate('/StreamsScreen')}}>
                 {/* menu iocn*/}
                 <PeopleBranchIcon  className="iconMenu"  />
                 <h5 className="menuText">Streams</h5>
               </div>
             </FlexboxGrid.Item>

             <FlexboxGrid.Item colspan={8}>
               <div className="menuItem">
                 {/* menu iocn*/}
                 <PeoplesIcon className="iconMenu" />
                 {/* menu title*/}
                 <h5 className="menuText">Users</h5>
               </div>
             </FlexboxGrid.Item>
           </FlexboxGrid>
         </Drawer.Body>
   </Drawer>
  </>
}
