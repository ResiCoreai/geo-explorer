import { isAbortError } from 'maplibre-gl/src/util/abort_error';
import {
  FullscreenControl,
  Layer,
  Map,
  NavigationControl,
  Source,
} from 'react-map-gl/maplibre';
import { useAuth } from 'react-oidc-context';
import { useDispatch, useSelector } from 'react-redux';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { GEOSERVER_URL } from '../../config';
import { LegendPanel } from '../../explore/MainMap/LegendPanel';
import { RippleOverlay } from '../../explore/MainMap/RippleOverlay/RippleOverlay';
import { WMSLayer } from '../../explore/MainMap/WMSLayer';
import { FitBounds } from '../../explore/MainMap/controls/FitBounds';
import { SelectedFeatures } from '../../explore/SelectedFeatures';
import { store } from '../../store';
import { identifyFeature } from '../../store/explore/actions';

export function MainMap() {
  var _a, _b, _c, _d;
  const auth = useAuth();
  const dispatch = useDispatch();
  const mapLayers = useSelector((state) => state.explore.mapLayers);
  const selectedLayer = useSelector((state) =>
    state.explore.mapLayers.find(
      (layer) => layer.data.layer_id === state.explore.selectedLayer,
    ),
  );
  const baseMaps = useSelector((state) => state.explore.baseMaps);
  const selectedBaseMap = useSelector((state) => state.explore.selectedBaseMap);
  return _jsxs(Map, {
    id: 'map',
    transformRequest: (url) => {
      var _a, _b;
      if (url.startsWith(GEOSERVER_URL)) {
        const layer_id = new URLSearchParams(url).get('layers');
        const mapLayers = store.getState().explore.mapLayers;
        const layer = mapLayers.find(
          (layer) => layer.data.layer_id === layer_id,
        );
        const shouldUseClientStyle = Boolean(
          layer.styleSLD && layer.version > 0,
        );
        if (shouldUseClientStyle) {
          return {
            url: url + '&sld_body=' + encodeURIComponent(layer.styleSLD),
            headers: {
              Authorization: `Bearer ${(_a = auth.user) === null || _a === void 0 ? void 0 : _a.access_token}`,
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
            Authorization: `Bearer ${(_b = auth.user) === null || _b === void 0 ? void 0 : _b.access_token}`,
          },
        };
      }
      return undefined;
    },
    onError: (e) => {
      if (isAbortError(e.error)) {
        // do nothing
      }
    },
    initialViewState: {
      longitude: -88.2272 - 3,
      latitude: 40.1075,
      zoom: 6,
      pitch: 0,
    },
    interactiveLayerIds: ['storage'],
    onClick: (e) => {
      if (
        selectedLayer &&
        selectedLayer.data.dataset_info.dataset_type === 'vector'
      ) {
        dispatch(
          identifyFeature(
            selectedLayer.data.layer_id,
            e.lngLat,
            e.target.getZoom(),
          ),
        );
      }
    },
    cursor: selectedLayer ? 'crosshair' : '',
    maxPitch: 85,
    children: [
      _jsx(NavigationControl, { position: 'top-right', visualizePitch: true }),
      _jsx(FullscreenControl, { position: 'top-right' }),
      _jsx(Source, {
        type: 'raster',
        tiles:
          baseMaps.length > 0
            ? [
                (_d =
                  (_b =
                    (_a = baseMaps.find(
                      (b) => b.layer_id === selectedBaseMap,
                    )) === null || _a === void 0
                      ? void 0
                      : _a.tile_url_template) !== null && _b !== void 0
                    ? _b
                    : (_c = baseMaps[0]) === null || _c === void 0
                      ? void 0
                      : _c.tile_url_template) !== null && _d !== void 0
                  ? _d
                  : '',
              ]
            : [],
        tileSize: 256,
        children: _jsx(Layer, { type: 'raster' }),
      }),
      mapLayers.map((layer, index) => {
        var _a;
        return _jsx(
          WMSLayer,
          {
            layer: layer,
            prevLayer:
              (_a = mapLayers[index - 1]) !== null && _a !== void 0 ? _a : null,
          },
          layer.data.layer_id,
        );
      }),
      _jsx(RippleOverlay, {}),
      _jsx(SelectedFeatures, {}),
      _jsx(FitBounds, {}),
      selectedLayer &&
        _jsx('div', {
          className: 'absolute bottom-12 right-3 z-50',
          children: _jsx(LegendPanel, {
            layers: mapLayers,
            selectedLayer: selectedLayer,
          }),
        }),
    ],
  });
}
