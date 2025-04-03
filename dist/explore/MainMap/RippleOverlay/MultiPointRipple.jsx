import { PointRipple } from '../../../explore/MainMap/RippleOverlay/PointRipple';
export function MultiPointRipple({ feature }) {
    return feature.geometry.coordinates.map((pointCoords, i) => (<PointRipple key={i} feature={{
            id: `${feature.id}_${i}`,
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: pointCoords,
            },
            properties: {},
        }}/>));
}
