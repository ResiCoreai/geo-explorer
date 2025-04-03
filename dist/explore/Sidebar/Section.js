import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import classNames from 'classnames';
import { useState } from 'react';
import { ArrowForward } from '../../icons/ArrowForward';
export function Section({ icon, title, extras, weight = 1, children }) {
    const [expanded, setExpanded] = useState(true);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "h-[40px] px-[32px] flex flex-row items-center gap-[6px] bg-[#13294B0D] cursor-pointer select-none", onClick: () => setExpanded(!expanded), children: [_jsx("div", { className: classNames('w-[16px] h-[16px] flex items-center justify-center transition-transform', {
                            'rotate-[90deg]': expanded,
                        }), children: _jsx(ArrowForward, { size: 16 }) }), _jsx("div", { className: "ml-[6px]  w-[20px] h-[20px] flex items-center justify-center", children: icon }), _jsx("div", { className: "text-[14px] text-[#2C343C] font-bold", children: title }), _jsx("div", { className: "flex-auto" }), _jsx("div", { className: "flex flex-row gap-6", children: extras })] }), _jsx("div", { className: "transition-all overflow-scroll no-scrollbar min-h-0", style: {
                    flexBasis: 0,
                    flexShrink: 1,
                    flexGrow: expanded ? weight : 0,
                }, children: children })] }));
}
