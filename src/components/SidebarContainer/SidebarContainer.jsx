import classes from "./SidebarContainer.module.scss";
import classNames from "classnames";
import SidebarConnected from "@components/Sidebar/Sidebar.connected";


function SidebarContainer({children, className = ''}) {
  return (
      <div className={classNames(classes.SidebarContainer, className)}>
        <SidebarConnected />
        <div className={classes.SidebarContainer__Content}>
          {children}
        </div>
      </div>
  )
}

export default SidebarContainer;