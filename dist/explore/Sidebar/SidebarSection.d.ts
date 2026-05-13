import { ReactNode } from 'react';
export type SidebarSectionProps = {
    title: string;
    icon?: ReactNode;
    weight?: number;
    extras?: ReactNode;
    children?: ReactNode;
    initialExpanded?: boolean;
};
export declare function SidebarSection({ icon, title, extras, weight, children, initialExpanded, }: SidebarSectionProps): import("react/jsx-runtime").JSX.Element;
