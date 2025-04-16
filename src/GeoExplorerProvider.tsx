import {
  ContextType,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
} from 'react';
import { Provider as ReduxStoreProvider } from 'react-redux';

import {
  ComponentRegistry,
  defaultComponents,
} from '@ncsa/geo-explorer/ComponentRegistry';
import { store } from '@ncsa/geo-explorer/store';
import { initLayers } from '@ncsa/geo-explorer/store/explore/slice';
import { GeoExplorerConfig } from '@ncsa/geo-explorer/types';
import { OGCClient } from '@ncsa/geo-explorer/utils/ogcClient';

export const GeoExplorerContext = createContext<{
  ogcClient: OGCClient | null;
  isProtectedResource?: ((url: string) => boolean) | undefined;
  components: ComponentRegistry;
}>({
  ogcClient: null,
  isProtectedResource: () => false,
  components: defaultComponents,
});

type Props = {
  config: GeoExplorerConfig | null;
  accessToken: string | undefined;
  isProtectedResource?: (url: string) => boolean;
  children: ReactNode;
  components?: Partial<ComponentRegistry>;
};

export function GeoExplorerProvider({
  config,
  accessToken,
  isProtectedResource,
  children,
  components,
}: Props) {
  const contextValue: ContextType<typeof GeoExplorerContext> = useMemo(() => {
    return {
      ogcClient: config ? new OGCClient({ accessToken }) : null,
      isProtectedResource,
      components: {
        ...defaultComponents,
        ...components,
      },
    };
  }, [config, components]);

  useEffect(() => {
    if (config) {
      store.dispatch(
        initLayers({
          simpleLayerInventory: config.simple_layers,
          temporalLayerInventory: config.temporal_layers,
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
