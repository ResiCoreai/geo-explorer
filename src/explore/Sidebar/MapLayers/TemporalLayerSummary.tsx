import { Box, Divider, Stack, Typography } from '@mui/material';

import { MapLayer } from '@ncsa/geo-explorer/store/explore/types';

type Props = {
  layer: MapLayer;
};

export function TemporalLayerSummary({ layer }: Props) {
  const timestamp = layer.data.timestamps[layer.timestampIdx];

  return (
    <Box className="pb-[10px]">
      <Divider />
      {Object.entries(layer.data.labels).map(([key, value]) => (
        <Stack key={key} direction="row" className="my-[6px]">
          <Typography className="text-[12px] text-[#2C343CCC] capitalize">
            {key.replace(/_/g, ' ')}:{' '}
          </Typography>
          <Box className="flex-1" />
          <Typography className="text-[12px] text-[#0455A4] font-semibold capitalize">
            {value}
          </Typography>
        </Stack>
      ))}
      {timestamp && (
        <Stack direction="row" className="my-[6px] text-[#2C343CCC]">
          <Typography className="text-[12px] text-[#2C343CCC]">
            Timestamp:{' '}
          </Typography>
          <Box className="flex-1" />
          <Typography className="text-[12px] font-semibold">
            {new Date(timestamp).getUTCFullYear()} Q
            {Math.floor(new Date(timestamp).getUTCMonth() / 3) + 1}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
