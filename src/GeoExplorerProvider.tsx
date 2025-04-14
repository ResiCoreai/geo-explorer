import {
  ContextType,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
} from 'react';
import { Provider as ReduxStoreProvider } from 'react-redux';

import { store } from '@ncsa/geo-explorer/store';
import { initLayers } from '@ncsa/geo-explorer/store/explore/slice';
import { GeoExplorerConfig } from '@ncsa/geo-explorer/types';
import { OGCClient } from '@ncsa/geo-explorer/utils/ogcClient';

export const GeoExplorerContext = createContext<{
  ogcClient: OGCClient | null;
}>({
  ogcClient: null,
});

type Props = {
  config: GeoExplorerConfig | null;
  accessToken: string | undefined;
  children: ReactNode;
};

export function GeoExplorerProvider({ config, accessToken, children }: Props) {
  const contextValue: ContextType<typeof GeoExplorerContext> = useMemo(() => {
    return {
      ogcClient: new OGCClient(
        'https://dachub.ncsa.illinois.edu/geoserver',
        accessToken,
      ),
    };
  }, [config]);

  useEffect(() => {
    if (config) {
      store.dispatch(
        initLayers({
          dataInventory: config.tech_requirement_layers,
          climateInventory: config.climate_layers,
          baseMaps: config.basemaps,
        }),
      );
    }
  }, [config]);

  return (
    <GeoExplorerContext.Provider value={contextValue}>
      <ReduxStoreProvider store={store}>{children}</ReduxStoreProvider>
    </GeoExplorerContext.Provider>
  );
}
