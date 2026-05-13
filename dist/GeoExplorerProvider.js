import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useEffect, useMemo, } from 'react';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { defaultComponents, } from './ComponentRegistry';
import { GeoExplorerReduxContext, store } from './store';
import { setInitializing, setLayerInventory, } from './store/explore/slice';
import { resolveFeatureType } from './utils/dataset';
import { OGCClient } from './utils/ogcClient';
export const GeoExplorerContext = createContext({
    accessToken: undefined,
    ogcClient: null,
    isProtectedResource: () => false,
    __UNSTABLE_components: defaultComponents,
    mapConfig: null,
});
export function GeoExplorerProvider({ config, accessToken, isProtectedResource, children, components, onReady, }) {
    const contextValue = useMemo(() => {
        var _a;
        return {
            accessToken,
            ogcClient: config ? new OGCClient({ accessToken }) : null,
            isProtectedResource,
            __UNSTABLE_components: {
                ...defaultComponents,
                ...components,
            },
            mapConfig: (_a = config === null || config === void 0 ? void 0 : config.mapConfig) !== null && _a !== void 0 ? _a : null,
        };
    }, [config, components]);
    useEffect(() => {
        (async function init() {
            const { ogcClient } = contextValue;
            if (!config || !ogcClient)
                return;
            // Initialization starts
            store.dispatch(setInitializing({ initializing: true }));
            //  Step 1: Default init
            store.dispatch(setLayerInventory({
                simpleLayerInventory: await Promise.all(config.simple_layers.map((dataset) => resolveFeatureType(dataset, ogcClient))),
                temporalLayerInventory: await Promise.all(config.temporal_layers.map((dataset) => resolveFeatureType(dataset, ogcClient))),
                baseMaps: config.basemaps,
            }));
            // Step 2: Custom post-init hook
            if (onReady) {
                await onReady({ config, ogcClient, store });
            }
            // Initialization ends
            store.dispatch(setInitializing({ initializing: false }));
        })();
    }, [config, contextValue]);
    return (_jsx(GeoExplorerContext.Provider, { value: contextValue, children: _jsx(ReduxStoreProvider, { context: GeoExplorerReduxContext, store: store, children: children }) }));
}
//# sourceMappingURL=GeoExplorerProvider.js.map