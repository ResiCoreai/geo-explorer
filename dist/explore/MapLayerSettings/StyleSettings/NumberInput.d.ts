export type NumberInputProps = {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    renderValue: (value: number) => string;
};
export declare function NumberInput({ value, onChange, min, max, step, renderValue, }: NumberInputProps): import("react/jsx-runtime").JSX.Element;
