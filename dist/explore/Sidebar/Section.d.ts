import { ReactNode } from 'react';

type Props = {
  title: string;
  icon?: ReactNode;
  weight?: number;
  extras?: ReactNode;
  children?: ReactNode;
};
export declare function Section({
  icon,
  title,
  extras,
  weight,
  children,
}: Props): import('react/jsx-runtime').JSX.Element;
export {};
