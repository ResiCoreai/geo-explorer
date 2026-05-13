import { Color } from '@react-types/color';
export type ColorInputProps = {
    value: Color;
    onChange: (color: Color) => void;
};
export declare function ColorInput({ value, onChange }: ColorInputProps): import("react/jsx-runtime").JSX.Element;
