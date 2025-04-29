import SLDParser from 'geostyler-sld-parser';
import { Rule, Style, Symbolizer } from 'geostyler-style';

import { store } from '@ncsa/geo-explorer/store';
import { MapLayerStyle } from '@ncsa/geo-explorer/store/explore/types';
import { LayerType } from '@ncsa/geo-explorer/types';

function createPointSymbolizer(style: MapLayerStyle): Symbolizer {
  return {
    kind: 'Mark',
    wellKnownName: 'circle',
    fillOpacity: style.fillOpacity,
    color: style.fillColor,
    strokeWidth: style.strokeWidth * devicePixelRatio,
    strokeColor: style.strokeColor,
    strokeOpacity: style.strokeOpacity,
    radius: style.radius * devicePixelRatio,
  };
}

function createLineSymbolizer(style: MapLayerStyle): Symbolizer {
  return {
    kind: 'Line',
    width: style.strokeWidth * devicePixelRatio,
    color: style.strokeColor,
    opacity: style.strokeOpacity,
  };
}

function createPolygonSymbolizer(style: MapLayerStyle): Symbolizer {
  return {
    kind: 'Fill',
    fillOpacity: style.fillOpacity,
    color: style.fillColor,
    outlineWidth: style.strokeWidth * devicePixelRatio,
    outlineColor: style.strokeColor,
    outlineOpacity: style.strokeOpacity,
  };
}

function createSymbolizer(
  type: LayerType,
  style: MapLayerStyle,
): Symbolizer | null {
  switch (type) {
    case 'point':
      return createPointSymbolizer(style);
    case 'line':
      return createLineSymbolizer(style);
    case 'polygon':
      return createPolygonSymbolizer(style);
    case 'raster':
      return null;
  }
}

function createStyleRules(type: LayerType, style: MapLayerStyle): Rule[] {
  const symbolizer = createSymbolizer(type, style);
  return symbolizer
    ? [
        {
          name: '',
          symbolizers: [symbolizer],
        },
      ]
    : [];
}

export async function formatSLD(
  layer_id: string,
  style: MapLayerStyle,
): Promise<string> {
  const selectedLayers = store.getState().explore.mapLayers;
  const layer = selectedLayers.find(
    (layer) => layer.data.layer_id === layer_id,
  )!;

  if (layer.data.layer_type === 'raster') {
    return '';
  }

  const geoStylerStyle: Style = {
    name: layer_id,
    rules: createStyleRules(layer.data.layer_type!, style),
  };
  const { output: styleSLD } = await new SLDParser().writeStyle(geoStylerStyle);

  return styleSLD ?? '';
}
