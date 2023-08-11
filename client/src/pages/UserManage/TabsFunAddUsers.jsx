import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DesignerManage from './DesignerManage';
import AdminManage from './AdminManage';
import StylistManage from './StylistManage';
import AddDesigner from './AddDesigner';
import AddStylist from './AddStylist';
import AddAdmin from './AddAdmin';
 
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  


export default function TabsFun() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
        
      <Box sx={{ width: '80%' ,ml:'120px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'red', // Change the selected tab color here
            },
            '& .Mui-selected': {
              color: '#FF0000', // Change the selected tab label color here
            },
          }}>
            <Tab label="Designers" {...a11yProps(1)} />
            <Tab label="Stylist" {...a11yProps(2)} />
            <Tab label="Admin" {...a11yProps(3)} />
          </Tabs>
          
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AddDesigner />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AddStylist />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AddAdmin />
        </CustomTabPanel>
      </Box>
    );
  }


