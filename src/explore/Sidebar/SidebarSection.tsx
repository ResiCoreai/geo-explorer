import classNames from 'classnames';
import { ReactNode, useState } from 'react';

import { ArrowForward } from '@ncsa/geo-explorer/icons/ArrowForward';

export type SidebarSectionProps = {
  title: string;
  icon?: ReactNode;
  weight?: number;
  extras?: ReactNode;
  children?: ReactNode;
};

export function SidebarSection({
  icon,
  title,
  extras,
  weight = 1,
  children,
}: SidebarSectionProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <div
        className="h-[40px] px-[32px] flex flex-row items-center gap-[6px] bg-[#13294B0D] cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className={classNames(
            'w-[16px] h-[16px] flex items-center justify-center transition-transform',
            {
              'rotate-[90deg]': expanded,
            },
          )}
        >
          <ArrowForward size={16} />
        </div>
        <div className="ml-[6px]  w-[20px] h-[20px] flex items-center justify-center">
          {icon}
        </div>
        <div className="text-[14px] text-[#2C343C] font-bold">{title}</div>
        <div className="flex-auto" />
        <div className="flex flex-row gap-6">{extras}</div>
      </div>
      <div
        className="transition-all overflow-scroll no-scrollbar min-h-0"
        style={{
          flexBasis: 0,
          flexShrink: 1,
          flexGrow: expanded ? weight : 0,
        }}
      >
        {children}
      </div>
    </>
  );
}
