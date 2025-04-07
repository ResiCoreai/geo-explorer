import { ExpandMore, LocationOn } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Gravatar from 'react-gravatar';
import { useAuth } from 'react-oidc-context';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

export const AppHeader = () => {
  var _a, _b;
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState(1); // Default active tab
  const [selectedLocation, setSelectedLocation] = useState(
    'Illinois Basin DAC Hub',
  ); // Default selected location
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
      'Authorization=;expires=Thu, 01 Jan 1900 00:00:00 GMT;path=/';
    auth.signoutRedirect();
  };
  return _jsx(AppBar, {
    elevation: 0,
    className: 'border-b border-gray-300 bg-white static',
    children: _jsxs(Toolbar, {
      className: 'flex justify-between min-h-[66px]',
      children: [
        _jsx(Box, {
          className: 'flex center',
          children: _jsx(Typography, {
            variant: 'body1',
            className:
              'font-playfair font-semibold text-[16px] leading-[14px] tracking-[0.17px] text-[#374151]',
            children: 'Master Planning Community App',
          }),
        }),
        _jsxs(Tabs, {
          value: activeTab,
          onChange: handleTabChange,
          children: [
            _jsx(Tab, {
              label: 'All Projects',
              disabled: true,
              className: 'capitalize',
            }),
            _jsx(Tab, { label: 'Data Explorer', className: 'capitalize' }),
            _jsx(Tab, {
              label: 'Site Analysis',
              disabled: true,
              className: 'capitalize',
            }),
          ],
        }),
        _jsxs(Box, {
          className: 'flex center',
          children: [
            _jsx(Button, {
              startIcon: _jsx(LocationOn, { className: 'text-[#4B5563]' }),
              endIcon: _jsx(ExpandMore, { className: 'text-[#4B5563]' }),
              onClick: handleMenuOpen,
              className:
                'text-[13px] text-[#374151] bg-[#F3F4F6] px-[8px] py-[4px] rounded-[6px] min-h-[32px] capitalize',
              children: selectedLocation,
            }),
            _jsx(Menu, {
              anchorEl: menuAnchorEl,
              open: Boolean(menuAnchorEl),
              onClose: () => setMenuAnchorEl(null),
              children: _jsx(MenuItem, {
                onClick: () =>
                  handleLocationSelection('Illinois Basin DAC Hub'),
                children: 'Illinois Basin DAC Hub',
              }),
            }),
            _jsx(IconButton, {
              onClick: handleProfileOpen,
              className: 'ml-[8px]',
              children: _jsx(Avatar, {
                className: 'w-[32px] h-[32px]',
                children: _jsx(Gravatar, {
                  email:
                    (_b =
                      (_a = auth.user) === null || _a === void 0
                        ? void 0
                        : _a.profile) === null || _b === void 0
                      ? void 0
                      : _b.email,
                  size: 32,
                  default: 'mp',
                }),
              }),
            }),
            _jsx(Menu, {
              anchorEl: profileAnchorEl,
              open: Boolean(profileAnchorEl),
              onClose: handleProfileClose,
              children: _jsx(MenuItem, {
                onClick: handleLogout,
                children: 'Logout',
              }),
            }),
          ],
        }),
      ],
    }),
  });
};
