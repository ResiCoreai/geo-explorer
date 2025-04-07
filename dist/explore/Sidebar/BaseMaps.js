import { Box, ListItemIcon, MenuItem, Select, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { selectBaseMap } from '../../store/explore/slice';

export const BaseMaps = () => {
  const { baseMaps, selectedBaseMap } = useSelector((state) => state.explore);
  // Determine the base map (use selected one if available, otherwise fallback to default)
  const activeBaseMap = useMemo(() => {
    var _a, _b;
    return (
      selectedBaseMap ||
      (baseMaps.length > 0
        ? (_b =
            (_a = baseMaps[0]) === null || _a === void 0
              ? void 0
              : _a.layer_id) !== null && _b !== void 0
          ? _b
          : null
        : null)
    );
  }, [selectedBaseMap, baseMaps]);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const selected = baseMaps.find((b) => b.layer_id === event.target.value);
    if (selected) {
      dispatch(selectBaseMap({ layer_id: selected.layer_id }));
    }
  };
  return _jsxs(Box, {
    className: 'flex-none h-[60px] items-center bg-[#F4F5F7] p-[12px]',
    children: [
      _jsx(Box, {
        className: 'flex-grow-1',
        children: _jsx(Typography, {
          variant: 'caption',
          color: 'gray',
          children: 'Basemap',
        }),
      }),
      _jsx(Select, {
        value: activeBaseMap || '',
        onChange: handleChange,
        variant: 'standard',
        disableUnderline: true,
        className: 'w-full bg-[#F4F5F7]',
        classes: {
          select: 'flex items-center justify-between', // Equivalent of `.MuiSelect-select`
        },
        children: baseMaps.map((basemap) =>
          _jsxs(
            MenuItem,
            {
              value: basemap.layer_id,
              className: 'flex items-center justify-between w-full',
              children: [
                basemap.display_name,
                _jsx(ListItemIcon, {
                  children: _jsx(Box, {
                    component: 'img',
                    src: basemap.thumbnail_url,
                    alt: basemap.display_name,
                    className: 'w-[50] h-[40] rounded-[4px] mr-[1]',
                  }),
                }),
              ],
            },
            basemap.layer_id,
          ),
        ),
      }),
    ],
  });
};
