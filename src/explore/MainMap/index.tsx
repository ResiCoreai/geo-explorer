import { useContext } from 'react';
import {
  FullscreenControl,
  Layer,
  Map,
  NavigationControl,
  Source,
} from 'react-map-gl/maplibre';
import { useAuth } from 'react-oidc-context';
import { useDispatch, useSelector } from 'react-redux';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';
import { LegendPanel } from '@ncsa/geo-explorer/explore/MainMap/LegendPanel';
import { RippleOverlay } from '@ncsa/geo-explorer/explore/MainMap/RippleOverlay/RippleOverlay';
import { WMSLayer } from '@ncsa/geo-explorer/explore/MainMap/WMSLayer';
import { FitBounds } from '@ncsa/geo-explorer/explore/MainMap/controls/FitBounds';
import { SelectedFeatures } from '@ncsa/geo-explorer/explore/SelectedFeatures';
import { AppDispatch, RootState, store } from '@ncsa/geo-explorer/store';
import { identifyFeature } from '@ncsa/geo-explorer/store/explore/actions';
import { isAbortError } from '@ncsa/geo-explorer/utils/maplibre-utils';

export function MainMap() {
  const auth = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { ogcClient } = useContext(GeoExplorerContext);

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

  return (
    <Map
      id="map"
      transformRequest={(url) => {
        if (ogcClient && url.startsWith(ogcClient.serviceUrl)) {
          const layer_id = new URLSearchParams(url).get('layers')!;
          const mapLayers = store.getState().explore.mapLayers;
          const layer = mapLayers.find(
            (layer) => layer.data.layer_id === layer_id,
          )!;

          const shouldUseClientStyle = Boolean(
            layer.styleSLD && layer.version > 0,
          );

          if (shouldUseClientStyle) {
            return {
              url: url + '&sld_body=' + encodeURIComponent(layer.styleSLD!),
              headers: {
                Authorization: `Bearer ${auth.user?.access_token}`,
              },
            };

            // return {
            //   url,
            //   method: 'POST',
            //   body: layer.styleSLD,
            //   headers: {
            //     Authorization: `Bearer ${auth.user?.access_token}`,
            //   },
            // };
          }
          return {
            url,
            headers: {
              Authorization: `Bearer ${auth.user?.access_token}`,
            },
          };
        }
        return undefined;
      }}
      onError={(e) => {
        if (isAbortError(e.error)) {
          // do nothing
        }
      }}
      initialViewState={{
        longitude: -88.2272 - 3,
        latitude: 40.1075,
        zoom: 6,
        pitch: 0,
      }}
      interactiveLayerIds={['storage']}
      onClick={(e) => {
        if (
          selectedLayer &&
          selectedLayer.data.dataset_info.dataset_type === 'vector'
        ) {
          if (ogcClient) {
            dispatch(
              identifyFeature(
                ogcClient,
                selectedLayer.data.layer_id,
                e.lngLat,
                e.target.getZoom(),
              ),
            );
          }
        }
      }}
      cursor={selectedLayer ? 'crosshair' : ''}
      maxPitch={85}
    >
      <NavigationControl position="top-right" visualizePitch={true} />
      <FullscreenControl position="top-right" />
      <Source
        type="raster"
        tiles={
          baseMaps.length > 0
            ? [
                baseMaps.find((b) => b.layer_id === selectedBaseMap)
                  ?.tile_url_template ??
                  baseMaps[0]?.tile_url_template ??
                  '',
              ]
            : []
        }
        tileSize={256}
      >
        <Layer type="raster" />
      </Source>

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

      {selectedLayer && (
        <div className="absolute bottom-12 right-3 z-50">
          <LegendPanel layers={mapLayers} selectedLayer={selectedLayer} />
        </div>
      )}
    </Map>
  );
}
