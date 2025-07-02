import { ColorLensOutlined, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { useOGCClient } from '@ncsa/geo-explorer/hooks/useOGCClient';
import { useDispatch } from '@ncsa/geo-explorer/store';
import {
  setLayerStyleName,
  setShowStyleSettings,
} from '@ncsa/geo-explorer/store/explore/slice';
import { MapLayer } from '@ncsa/geo-explorer/store/explore/types';

type Props = {
  layer: MapLayer;
};

export function StyleEditor({ layer }: Props) {
  const dispatch = useDispatch();
  const [styleOptions, setStyleOptions] = useState<string[]>([]);
  const ogcClient = useOGCClient();

  useEffect(() => {
    ogcClient?.getStyleNames(layer.data).then(setStyleOptions);
  }, [layer]);

  return (
    <Stack
      direction="column"
      className="h-full bg-white border border-[#0000001F]"
    >
      <Stack
        direction="row"
        className="h-[44px] px-[16px] py-[12px] items-center gap-[5px]"
      >
        <ColorLensOutlined />
        <Typography className="font-sans text-[14px] uppercase">
          Appearance Settings
        </Typography>
      </Stack>
      <Stack className="flex-1 py-[10px]">
        <Box className="flex-1 overflow-y-scroll">
          <Accordion elevation={0}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography className="font-medium uppercase">General</Typography>
            </AccordionSummary>
            <AccordionDetails className="px-[16px]">
              <Typography className="text-[14px]">Styles</Typography>
              <Select
                className={classNames(
                  'mt-[10px] h-[34px] px-4 py-2',
                  'border border-solid rounded-md shadow-sm border-[#D1D5DB] focus:bg-[#F3F4F6] hover:bg-[#F3F4F6]',
                  'flex items-center',
                )}
                value={layer.style_name}
                onChange={(e) => {
                  dispatch(
                    setLayerStyleName({
                      layer_id: layer.data.layer_id,
                      style_name: e.target.value!,
                    }),
                  );
                }}
                fullWidth
                variant="standard"
                disableUnderline
              >
                {styleOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Button
          className="mx-[16px]"
          disableElevation
          variant="contained"
          onClick={() => dispatch(setShowStyleSettings({ show: false }))}
        >
          Done
        </Button>
      </Stack>
    </Stack>
  );
}
