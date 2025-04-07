import {
  ColorEditor,
  ColorPicker,
  ColorSwatch,
  ColorSwatchPicker,
  defaultTheme,
} from '@adobe/react-spectrum';
import { Box, Typography } from '@mui/material';
import { Provider as SpectrumProvider } from '@react-spectrum/provider';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

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
export function ColorInput({ value, onChange }) {
  return _jsxs(Box, {
    className: 'pl-[12px]',
    children: [
      _jsx(Typography, {
        className: 'mt-[16px] text-[14px]',
        children: 'Standard Colors',
      }),
      _jsx(SpectrumProvider, {
        colorScheme: 'light',
        theme: defaultTheme,
        scale: 'medium',
        children: _jsx(Box, {
          className: 'mt-[12px] bg-white',
          children: _jsx(ColorSwatchPicker, {
            value: value,
            onChange: onChange,
            children: colorPalette.map((color) =>
              _jsx(ColorSwatch, { color: color, rounding: 'default' }, color),
            ),
          }),
        }),
      }),
      _jsx(Typography, {
        className: 'mt-[24px] text-[14px]',
        children: 'Customized Color',
      }),
      _jsx(SpectrumProvider, {
        colorScheme: 'light',
        theme: defaultTheme,
        scale: 'medium',
        children: _jsx(Box, {
          className: 'mt-[12px] bg-white',
          children: _jsx(ColorPicker, {
            value: value,
            onChange: onChange,
            children: _jsx(ColorEditor, {}),
          }),
        }),
      }),
    ],
  });
}
