import { Map } from 'maplibre-gl';
export type MapHandler = (map: Map) => void | (() => void);
export declare function registerMapAccessHandler(fn: MapHandler): void;
export declare function unregisterMapAccessHandler(fn: MapHandler): void;
export declare function provideMapInstanceToHandlers(map: Map): void;
