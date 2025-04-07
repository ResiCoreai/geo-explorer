import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Slider, Stack, Typography } from "@mui/material";
export function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  renderValue,
}) {
  return _jsxs(Stack, {
    direction: "row",
    className: "my-[20px]",
    children: [
      _jsxs(Stack, {
        spacing: 2,
        direction: "row",
        className: "items-center gap-[8px]",
        children: [
          _jsx(Typography, {
            className: "w-[20px] flex-none",
            children: renderValue(min),
          }),
          _jsx(Slider, {
            size: "small",
            className: "w-[250px]",
            min: min,
            max: max,
            step: step,
            value: value,
            onChange: (_, value) => onChange(+value),
          }),
          _jsx(Typography, {
            className: "w-[20px] flex-none",
            children: renderValue(max),
          }),
        ],
      }),
      _jsx(Box, { className: "flex-1" }),
      _jsx(Typography, {
        className:
          "w-[57px] h-[32px] bg-[#F8F9FA] leading-[32px] text-[14px] text-center",
        children: renderValue(value),
      }),
    ],
  });
}
