import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { useImplementation } from '../../../hooks/useImplementation';
import { useSelector } from '../../../store';
export function RippleOverlay() {
    const { RippleEffects } = useImplementation();
    const { current: map } = useMap();
    const features = useSelector((state) => state.explore.selectedFeatures);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    useEffect(() => {
        if (!map)
            return;
        const resize = () => {
            setWidth(map.getCanvas().getBoundingClientRect().width);
            setHeight(map.getCanvas().getBoundingClientRect().height);
        };
        map.on('resize', resize);
        resize();
        return () => {
            map.off('resize', resize);
        };
    }, [map]);
    return (_jsx("svg", { width: width, height: height, className: "absolute left-0 top-0 pointer-events-none", children: features.map((feature) => (_jsx(RippleEffects, { feature: feature }, feature.id))) }));
}
//# sourceMappingURL=RippleOverlay.js.map