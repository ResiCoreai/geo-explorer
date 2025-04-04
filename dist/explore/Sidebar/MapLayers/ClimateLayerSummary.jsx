import { Box, Divider, Stack, Typography } from "@mui/material";
export function ClimateLayerSummary({ layer }) {
  const timestamp = layer.data.dataset_info.timestamps[layer.timestampIdx];
  return (
    <Box className="pb-[10px]">
      <Divider />
      <Stack direction="row" className="my-[6px]">
        <Typography className="text-[12px] text-[#2C343CCC]">
          Scenario:{" "}
        </Typography>
        <Box className="flex-1" />
        <Typography className="text-[12px] text-[#0455A4] font-semibold">
          {layer.data.dataset_info.climate_scenario}
        </Typography>
      </Stack>
      {timestamp && (
        <Stack direction="row" className="my-[6px] text-[#2C343CCC]">
          <Typography className="text-[12px] text-[#2C343CCC]">
            Timestamp:{" "}
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
