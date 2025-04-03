import { ExpandMore, LocationOn } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Tab, Tabs, Toolbar, Typography, } from "@mui/material";
import { useState } from "react";
import Gravatar from "react-gravatar";
import { useAuth } from "react-oidc-context";
export const AppHeader = () => {
    var _a, _b;
    const auth = useAuth();
    const [activeTab, setActiveTab] = useState(1); // Default active tab
    const [selectedLocation, setSelectedLocation] = useState("Illinois Basin DAC Hub"); // Default selected location
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const handleTabChange = (_, newValue) => {
        setActiveTab(newValue);
    };
    const handleMenuOpen = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };
    const handleProfileOpen = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };
    const handleLocationSelection = (location) => {
        setSelectedLocation(location);
        setMenuAnchorEl(null);
    };
    const handleProfileClose = () => {
        setProfileAnchorEl(null);
    };
    const handleLogout = () => {
        setProfileAnchorEl(null);
        document.cookie =
            "Authorization=;expires=Thu, 01 Jan 1900 00:00:00 GMT;path=/";
        auth.signoutRedirect();
    };
    return (<AppBar elevation={0} className="border-b border-gray-300 bg-white static">
      <Toolbar className="flex justify-between min-h-[66px]">
        {/* Left Section: Project Icon + Name */}
        <Box className="flex center">
          {/*TODO logo*/}
          {/*<Box className="w-[20px] h-[20px] bg-[#D9D9D9] rounded-[3px] mr-[8px]" />*/}
          <Typography variant="body1" className="font-playfair font-semibold text-[16px] leading-[14px] tracking-[0.17px] text-[#374151]">
            Master Planning Community App
          </Typography>
        </Box>

        {/* Center Section: Tabs Navigation */}
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="All Projects" disabled className="capitalize"/>
          <Tab label="Data Explorer" className="capitalize"/>
          <Tab label="Site Analysis" disabled className="capitalize"/>
        </Tabs>

        {/* Right Section: Location Dropdown + Gravatar Profile */}
        <Box className="flex center">
          {/* Location Dropdown */}
          <Button startIcon={<LocationOn className="text-[#4B5563]"/>} endIcon={<ExpandMore className="text-[#4B5563]"/>} onClick={handleMenuOpen} className="text-[13px] text-[#374151] bg-[#F3F4F6] px-[8px] py-[4px] rounded-[6px] min-h-[32px] capitalize">
            {selectedLocation}
          </Button>
          <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={() => setMenuAnchorEl(null)}>
            <MenuItem onClick={() => handleLocationSelection("Illinois Basin DAC Hub")}>
              Illinois Basin DAC Hub
            </MenuItem>
          </Menu>

          {/* Gravatar Profile Icon */}
          <IconButton onClick={handleProfileOpen} className="ml-[8px]">
            <Avatar className="w-[32px] h-[32px]">
              <Gravatar email={(_b = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.profile) === null || _b === void 0 ? void 0 : _b.email} size={32} default="mp"/>
            </Avatar>
          </IconButton>

          {/* Profile Menu with Logout */}
          <Menu anchorEl={profileAnchorEl} open={Boolean(profileAnchorEl)} onClose={handleProfileClose}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>);
};
