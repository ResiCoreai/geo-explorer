import {
  ColorEditor,
  ColorPicker,
  ColorSwatch,
  ColorSwatchPicker,
  defaultTheme,
} from '@adobe/react-spectrum';
import { Box, Typography } from '@mui/material';
import { Provider as SpectrumProvider } from '@react-spectrum/provider';
import { Color } from '@react-types/color';

const colorPalette = [
  '#FF3939',
  '#FF79A9',
  '#F79941',
  '#FFCD47',
  '#22B45D',
  '#80F485',
  '#EAE21B',
  '#384E9E',
  '#5B7FFF',
  '#8D43EB',
];

export type ColorInputProps = {
  value: Color;
  onChange: (color: Color) => void;
};

export function ColorInput({ value, onChange }: ColorInputProps) {
  return (
    <Box className="pl-[12px]">
      <Typography className="mt-[16px] text-[14px]">Standard Colors</Typography>
      <SpectrumProvider colorScheme="light" theme={defaultTheme} scale="medium">
        <Box className="mt-[12px] bg-white">
          <ColorSwatchPicker value={value} onChange={onChange}>
            {colorPalette.map((color) => (
              <ColorSwatch key={color} color={color} rounding="default" />
            ))}
          </ColorSwatchPicker>
        </Box>
      </SpectrumProvider>
      <Typography className="mt-[24px] text-[14px]">
        Customized Color
      </Typography>
      <SpectrumProvider colorScheme="light" theme={defaultTheme} scale="medium">
        <Box className="mt-[12px] bg-white">
          <ColorPicker value={value} onChange={onChange}>
            <ColorEditor />
          </ColorPicker>
        </Box>
      </SpectrumProvider>
    </Box>
  );
}
