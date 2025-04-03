import { LineRipple } from '../../../explore/MainMap/RippleOverlay/LineRipple';
export function MultiLineRipple({ feature }) {
    return feature.geometry.coordinates.map((lineCoords, i) => (<LineRipple key={i} feature={{
            id: `${feature.id}_${i}`,
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: lineCoords,
            },
            properties: {},
        }}/>));
}
