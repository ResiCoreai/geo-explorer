type Props = {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    renderValue: (value: number) => string;
};
export declare function NumberInput({ value, onChange, min, max, step, renderValue, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
