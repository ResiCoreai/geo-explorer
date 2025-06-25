export { GeoExplorer } from './GeoExplorer';
export { GeoExplorerProvider } from './GeoExplorerProvider';

export { OGCClient } from './utils/ogcClient';
export { useOGCClient } from './hooks/useOGCClient';
export { useImplementation } from './hooks/useImplementation';

export * from './store';
export * from './store/explore/slice';
export * from './store/explore/actions';

export { GeoExplorerConfig } from './types';

export {
  SimpleLayerItemProps,
  SimpleLayerItem,
} from './explore/Sidebar/DataInventory/SimpleLayerItem';

export * from './MapAccessRegistery';

// TODO export Map type from maplibre-gl used in geo-explorer need to think a better way to do this
export type { Map } from 'maplibre-gl';
