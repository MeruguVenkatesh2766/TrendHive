import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ScrollableTabsButtonAuto({options,tabsValue,handleChangeTabsValue}) {

  return (
    <Box sx={{ maxWidth: { xs: '60%', sm: '65%' }, bgcolor: 'background.paper' }}>
      <Tabs
        value={tabsValue}
        onChange={handleChangeTabsValue}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {options.map((option)=>
        <Tab key={option} label={option} />
        )}
      </Tabs>
    </Box>
  );
}