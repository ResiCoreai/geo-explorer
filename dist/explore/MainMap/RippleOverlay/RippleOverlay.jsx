import { useEffect, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { useSelector } from 'react-redux';
import { RippleEffects } from '../../../explore/MainMap/RippleOverlay/RippleEffects';
export function RippleOverlay() {
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
    return (<svg width={width} height={height} className="absolute left-0 top-0 pointer-events-none">
      {features.map((feature) => (<RippleEffects key={feature.id} feature={feature}/>))}
    </svg>);
}
