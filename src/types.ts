export type LayerType = 'point' | 'line' | 'polygon' | 'raster';

export interface Dataset {
  layer_id: string;
  layer_type: LayerType;
  display_name: string;
  description: string;
  default_style_name?: string;
  ogc_service_url: string;
  timestamps: string[];
  unit?: string;
  labels: {
    dataset_category: string;
    [key: string]: string;
  };
}

export interface Basemap {
  layer_id: string;
  display_name: string;
  tile_url_template: string;
  thumbnail_url: string;
}

export interface MapConfig {
  center: [number, number];
  zoom: number;
  pitch?: number;
  maxPitch?: number;
  tileSize?: number;
}

export interface GeoExplorerConfig {
  bearerToken?: string;
  basemaps: Basemap[];
  simple_layers: Dataset[];
  temporal_layers: Dataset[];
  mapConfig?: MapConfig;
}

export interface FeatureTypeInfo {
  elementFormDefault: string;
  targetNamespace: string;
  targetPrefix: string;
  featureTypes: [
    {
      typeName: string;
      properties: Array<{
        name: string;
        maxOccurs: number;
        minOccurs: number;
        nillable: boolean;
        type: string;
        localType:
          | 'Point'
          | 'MultiPoint'
          | 'LineString'
          | 'MultiLineString'
          | 'Polygon'
          | 'MultiPolygon';
      }>;
    },
  ];
}

export interface RasterSymbolizer {
  Raster: {
    colormap: {
      entries: Array<{
        quantity: string;
        color: string;
      }>;
    };
  };
}

export interface PointSymbolizer {
  Point: {
    title?: string;
    abstract?: string;
    url?: string;
    size?: string;
    opacity?: string;
    rotation?: string;
    graphics: Array<{
      mark?: string;
      fill: string;
      'fill-opacity'?: string;
    }>;
  };
}

export interface LineSymbolizer {
  Line: {
    stroke: string;
    'stroke-width'?: string;
    'stroke-opacity'?: string;
    'stroke-linecap'?: string;
    'stroke-linejoin'?: string;
  };
}

export interface PolygonSymbolizer {
  Polygon: {
    stroke?: string;
    'stroke-width'?: string;
    'stroke-opacity'?: string;
    'stroke-linecap'?: string;
    'stroke-linejoin'?: string;
    fill?: string;
    'fill-opacity'?: string;
  };
}

export type VectorSymbolizer =
  | PointSymbolizer
  | LineSymbolizer
  | PolygonSymbolizer;

export type Symbolizer =
  | PointSymbolizer
  | LineSymbolizer
  | PolygonSymbolizer
  | RasterSymbolizer;

export interface Legend<SymbolizerT extends Symbolizer> {
  Legend: [
    {
      layerName: string;
      title: string;
      rules: Array<{
        name: string;
        title?: string;
        abstract?: string;
        filter?: string;
        symbolizers: [SymbolizerT];
      }>;
    },
  ];
}
