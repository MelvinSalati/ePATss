import React ,{useEffect, useState }from  'react'
import {Drawer, FlexboxGrid} from 'rsuite'

import '../../../assets/epats.css'

export function DrawerMenu (props) {
  const [open, setOpen] = useState(props.state);
 const openMenuDrawer   = () => {
   open ? setOpen(true) : setOpen(false)
 }
  useEffect(()=> {

  },[open])
  return <>

  </>
}
