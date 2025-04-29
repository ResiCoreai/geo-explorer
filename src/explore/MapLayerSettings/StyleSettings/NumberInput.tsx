import { Box, Slider, Stack, Typography } from '@mui/material';

export type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  renderValue: (value: number) => string;
};

export function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  renderValue,
}: NumberInputProps) {
  return (
    <Stack direction="row" className="my-[20px]">
      <Stack spacing={2} direction="row" className="items-center gap-[8px]">
        <Typography className="w-[20px] flex-none">
          {renderValue(min)}
        </Typography>
        <Slider
          size="small"
          className="w-[250px]"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(_, value) => onChange(+value)}
        />
        <Typography className="w-[20px] flex-none">
          {renderValue(max)}
        </Typography>
      </Stack>
      <Box className="flex-1" />
      <Typography className="w-[57px] h-[32px] bg-[#F8F9FA] leading-[32px] text-[14px] text-center">
        {renderValue(value)}
      </Typography>
    </Stack>
  );
}
