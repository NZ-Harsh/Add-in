import { useState } from 'react';
import useTheme from '../../Theme';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import data from '../../nze.json';
import { DataCenter } from '../../Components/Tabs/Datacenter/DataCenter';
import { Inventory } from '../../Components/Tabs/Inventory/Inventory';
import Library from '../../Components/Tabs/Library/Library';
import ReplyIcon from '@mui/icons-material/Reply';
import { getSessionVariableFromStorage } from '../../Common/Common';

interface SessionItem {
  SessionValue: string; // or the appropriate type for SessionValue
}
const Main = () => {
  useTheme(data.colortheme);
  const [activeTabs, setActiveTabs] = useState<number>(2);
  const [previousTabs, setPreviousTabs] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);
  const [transition, setTransition] = useState<boolean>(false);

  const handleChange = (_event: any, newValue: number) => {
    setLoading(true);
    setPreviousTabs(activeTabs);
    setTransition(true);

    setTimeout(() => {
      setActiveTabs(newValue);
      setTransition(false);
      setLoading(false);
    }, 300);
  };

  // Handle ReplyIcon click to go back to the previous tab
  const handleBackToPreviousTab = () => {
    setActiveTabs(previousTabs);
  };
  // const sessionvariable:any = getStorageItem("session_variables")
  const sessionvariable: SessionItem[] = getSessionVariableFromStorage("Location", "SiteName")
  console.log("sitename", sessionvariable)
  const sessionValues = sessionvariable.map(item => item.SessionValue);






  return (
    <div className="main-page">
      {/* Backdrop with CircularProgress for loading */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="button-container">
        <div className="back-icon" onClick={handleBackToPreviousTab} title="Back">
          <ReplyIcon />
        </div>
        <h5 className="sign-out-button" title="Sign Out">Sign-Out</h5>
        <h5 className="site-name" title="LANShark Tower">[{sessionValues}]</h5>
      </div>

      <div className="tab-container">
        <div className='tab'>
        <Tabs
        aria-label="basic tabs example"
        className="custom-tabs"
        value={activeTabs}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto" 
      >
        <Tab label="DataCenter" />
        <Tab label="Inventory" />
        <Tab label="Library" />
      </Tabs>
          {/* <IconButton className='scroll-btn'> <ChevronRightIcon /></IconButton> */}
        </div>

        <div
          className={`tabs-content ${transition ? (activeTabs < previousTabs ? 'slide-left' : 'slide-right') : ''
            }`}
        >
          {activeTabs === 0 && <DataCenter />}
          {activeTabs === 1 && <Inventory />}
          {activeTabs === 2 && <Library />}
        </div>
      </div>
    </div>
  );
};

export default Main;
