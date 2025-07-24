import { useContext } from 'react';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';

export function useImplementation() {
  return useContext(GeoExplorerContext).__UNSTABLE_components;
}
