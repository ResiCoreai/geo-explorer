import { createContext } from 'react';

import { OGCClient } from '@ncsa/geo-explorer/utils/ogcClient';

export const GeoExplorerContext = createContext<{
  ogcClient: OGCClient | null;
}>({
  ogcClient: null,
});
