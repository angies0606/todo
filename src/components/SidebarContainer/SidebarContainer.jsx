import React from "react";
import SidebarConnected from '@components/Sidebar/Sidebar.connected';
import classes from './SidebarContainer.module.scss';

function SidebarContainer({children, className = ''}) {
  return (
    <div className={classes.SidebarContainer + ' ' + className}>
      <SidebarConnected className={classes.SidebarContainer__Sidebar} />
      <div className={classes.SidebarContainer__Content}>
        {children}
      </div>
    </div>
  )
}

export default SidebarContainer;