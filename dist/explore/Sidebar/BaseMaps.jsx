import { Box, ListItemIcon, MenuItem, Select, Typography, } from '@mui/material';
import React from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBaseMap } from '../../store/explore/slice';
export const BaseMaps = () => {
    const { baseMaps, selectedBaseMap } = useSelector((state) => state.explore);
    // Determine the base map (use selected one if available, otherwise fallback to default)
    const activeBaseMap = useMemo(() => {
        var _a, _b;
        return selectedBaseMap ||
            (baseMaps.length > 0 ? ((_b = (_a = baseMaps[0]) === null || _a === void 0 ? void 0 : _a.layer_id) !== null && _b !== void 0 ? _b : null) : null);
    }, [selectedBaseMap, baseMaps]);
    const dispatch = useDispatch();
    const handleChange = (event) => {
        const selected = baseMaps.find((b) => b.layer_id === event.target.value);
        if (selected) {
            dispatch(selectBaseMap({ layer_id: selected.layer_id }));
        }
    };
    return (<Box className="flex-none h-[60px] items-center bg-[#F4F5F7] p-[12px]">
      <Box className="flex-grow-1">
        <Typography variant="caption" color="gray">
          Basemap
        </Typography>
      </Box>
      <Select value={activeBaseMap || ''} onChange={handleChange} variant="standard" disableUnderline className="w-full bg-[#F4F5F7]" classes={{
            select: 'flex items-center justify-between', // Equivalent of `.MuiSelect-select`
        }}>
        {baseMaps.map((basemap) => (<MenuItem key={basemap.layer_id} value={basemap.layer_id} className="flex items-center justify-between w-full">
            {basemap.display_name}
            <ListItemIcon>
              <Box component="img" src={basemap.thumbnail_url} alt={basemap.display_name} className="w-[50] h-[40] rounded-[4px] mr-[1]"/>
            </ListItemIcon>
          </MenuItem>))}
      </Select>
    </Box>);
};
