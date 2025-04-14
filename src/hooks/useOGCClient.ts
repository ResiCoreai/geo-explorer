import { useContext } from 'react';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';
import { OGCClient } from '@ncsa/geo-explorer/utils/ogcClient';

export function useOGCClient(): OGCClient | null {
  const { ogcClient } = useContext(GeoExplorerContext);
  return ogcClient;
}