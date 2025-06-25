import { Map } from 'maplibre-gl';

export type MapHandler = (map: Map) => void | (() => void);

const handlers = new Set<MapHandler>();

export function registerMapAccessHandler(fn: MapHandler) {
  handlers.add(fn);
}

export function unregisterMapAccessHandler(fn: MapHandler) {
  handlers.delete(fn);
}

export function provideMapInstanceToHandlers(map: Map) {
  handlers.forEach((fn) => fn(map));
}
