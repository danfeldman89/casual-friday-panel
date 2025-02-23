import React from "react";
import { Box } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <Box role="tabpanel"
         hidden={value !== index}
         id={`tabpanel-${index}`}
         aria-labelledby={`tab-${index}`}
         sx={{ height: "100%" }}>
      {value === index && (
        <Box sx={{ p: 3, height: "100%" }}>
          {children}
        </Box>
      )}
    </Box>
  );
};

export default TabPanel;
