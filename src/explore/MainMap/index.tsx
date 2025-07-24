import { useContext } from 'react';
import {
  FullscreenControl,
  Layer,
  Map,
  NavigationControl,
  Source,
} from 'react-map-gl/maplibre';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';
import { provideMapInstanceToHandlers } from '@ncsa/geo-explorer/MapAccessRegistery';
import { DEFAULT_BOUNDS } from '@ncsa/geo-explorer/config';
import { FitBounds } from '@ncsa/geo-explorer/explore/MainMap/controls/FitBounds';
import { useImplementation } from '@ncsa/geo-explorer/hooks/useImplementation';
import {
  AppDispatch,
  RootState,
  store,
  useDispatch,
  useSelector,
} from '@ncsa/geo-explorer/store';
import { setSelectedFeatures } from '@ncsa/geo-explorer/store/explore/slice';
import { isAbortError } from '@ncsa/geo-explorer/utils/maplibre-utils';

export function MainMap() {
  const { RippleOverlay, WMSLayer, SelectedFeatures } = useImplementation();

  const dispatch = useDispatch<AppDispatch>();
  const { accessToken, ogcClient, isProtectedResource, mapConfig } =
    useContext(GeoExplorerContext);

  const mapLayers = useSelector((state: RootState) => state.explore.mapLayers);
  const selectedLayer = useSelector((state: RootState) =>
    state.explore.mapLayers.find(
      (layer) => layer.data.layer_id === state.explore.selectedLayer,
    ),
  );
  const baseMaps = useSelector((state: RootState) => state.explore.baseMaps);
  const selectedBaseMap = useSelector(
    (state: RootState) => state.explore.selectedBaseMap,
  );

  // Grab the initial map view from the mapConfig
  const initMapBound = mapConfig?.boundingBox;
  const handleOnLoad = (e: maplibregl.MapLibreEvent) => {
    const map = e.target;
    provideMapInstanceToHandlers(map);

    if (initMapBound) {
      const sw: [number, number] = [initMapBound[0], initMapBound[1]];
      const ne: [number, number] = [initMapBound[2], initMapBound[3]];
      map.fitBounds([sw, ne], {
        padding: 40,
        animate: false,
      });
    } else {
      map.fitBounds(DEFAULT_BOUNDS, { padding: 40, animate: false });
    }
  };

  return (
    <Map
      id="map"
      attributionControl={false}
      transformRequest={(url) => {
        if (isProtectedResource?.(url)) {
          const layer_id = new URLSearchParams(url).get('layers')!;
          const mapLayers = store.getState().explore.mapLayers;
          const layer = mapLayers.find(
            (layer) => layer.data.layer_id === layer_id,
          )!;

          const shouldUseClientStyle = Boolean(
            layer.styleSLD && layer.version > 0,
          );

          if (shouldUseClientStyle) {
            // return {
            //   url: url + '&sld_body=' + encodeURIComponent(layer.styleSLD!),
            //   headers: {
            //     Authorization: `Bearer ${accessToken}`,
            //   },
            // };

            return {
              url,
              method: 'POST',
              body: layer.styleSLD,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            };
          }
          return {
            url,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
        }
        return undefined;
      }}
      onError={(e) => {
        console.error(e.error.stack);
        if (isAbortError(e.error)) {
          // do nothing
        }
      }}
      // onLoad={(e) => provideMapInstanceToHandlers(e.target)}
      onLoad={handleOnLoad}
      interactiveLayerIds={['storage']}
      onClick={(e) => {
        if (selectedLayer && selectedLayer.data.layer_type !== 'raster') {
          ogcClient?.identifyFeature(e, selectedLayer.data).then((features) => {
            dispatch(setSelectedFeatures(features));
          });
        }
      }}
      cursor={selectedLayer ? 'crosshair' : ''}
      maxPitch={mapConfig?.maxPitch ?? 85}
    >
      <NavigationControl position="top-right" visualizePitch={true} />
      <FullscreenControl position="top-right" />
      {baseMaps.length > 0 && (
        <Source
          type="raster"
          tiles={[
            baseMaps.find((b) => b.layer_id === selectedBaseMap)
              ?.tile_url_template ??
              baseMaps[0]?.tile_url_template ??
              '',
          ]}
          tileSize={mapConfig?.tileSize ?? 256}
        >
          <Layer type="raster" />
        </Source>
      )}

      {mapLayers.map((layer, index) => (
        <WMSLayer
          key={layer.data.layer_id}
          layer={layer}
          prevLayer={mapLayers[index - 1] ?? null}
        />
      ))}

      <RippleOverlay />
      <SelectedFeatures />
      <FitBounds />
    </Map>
  );
}
