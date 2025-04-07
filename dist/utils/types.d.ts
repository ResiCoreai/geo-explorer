import { MapLayer } from '../store/explore/types';

export type FeatureType = 'point' | 'line' | 'polygon';
export interface BaseDatasetInfo {
  timestamps: string[];
}
export interface VectorDatasetInfo extends BaseDatasetInfo {
  dataset_type: 'vector';
  dataset_category: string;
  feature_type: FeatureType;
}
export interface RasterDatasetInfo extends BaseDatasetInfo {
  dataset_type: 'raster';
  dataset_category: string;
}
export interface ClimateDatasetInfo extends RasterDatasetInfo {
  dataset_category: 'climate';
  climate_variable_desc: string;
  climate_variable: string;
  climate_scenario: string;
  unit: string;
}
export type DatasetInfo =
  | VectorDatasetInfo
  | RasterDatasetInfo
  | ClimateDatasetInfo;
export interface Dataset {
  layer_id: string;
  display_name: string;
  description: string;
  dataset_info: DatasetInfo;
  default_style_name?: string;
  ogc_service_url?: string;
}
export interface Basemap {
  layer_id: string;
  display_name: string;
  tile_url_template: string;
  thumbnail_url: string;
}
export interface Metadata {
  basemaps: Basemap[];
  tech_requirement_layers: Dataset[];
  climate_layers: Dataset[];
}
export declare function isClimateData(layer: MapLayer): layer is MapLayer & {
  data: {
    dataset_info: ClimateDatasetInfo;
  };
};
export declare function isCategoricalData(
  layer: MapLayer,
): layer is MapLayer & {
  data: {
    dataset_info: VectorDatasetInfo;
  };
};
export declare function isSingleCategoryData(
  layer: MapLayer,
): layer is MapLayer & {
  data: {
    dataset_info: VectorDatasetInfo;
  };
};
export declare function isVectorData(layer: MapLayer): layer is MapLayer & {
  data: {
    dataset_info: VectorDatasetInfo;
  };
};
export type Legend = RasterLegend;
export interface RasterLegend {
  Legend: [
    {
      layerName: string;
      title: string;
      rules: [
        {
          symbolizers: [
            {
              Raster: {
                colormap: {
                  entries: Array<{
                    quantity: string;
                    color: string;
                  }>;
                };
              };
            },
          ];
        },
      ];
    },
  ];
}
export interface CategoricalPointLegend {
  Legend: [
    {
      layerName: string;
      title: string;
      rules: Array<{
        name: string;
        title?: string;
        filter?: string;
        symbolizers: [
          {
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
          },
        ];
      }>;
    },
  ];
}
export interface CategoricalLineLegend {
  Legend: [
    {
      layerName: string;
      title: string;
      rules: Array<{
        name: string;
        title?: string;
        filter?: string;
        symbolizers: [
          {
            Line: {
              stroke: string;
              'stroke-width'?: string;
              'stroke-opacity'?: string;
              'stroke-linecap'?: string;
              'stroke-linejoin'?: string;
            };
          },
        ];
      }>;
    },
  ];
}
export interface CategoricalPolygonLegend {
  Legend: [
    {
      layerName: string;
      title: string;
      rules: Array<{
        name: string;
        title?: string;
        abstract?: string;
        symbolizers: [
          {
            Polygon: {
              stroke?: string;
              'stroke-width'?: string;
              'stroke-opacity'?: string;
              'stroke-linecap'?: string;
              'stroke-linejoin'?: string;
              fill?: string;
              'fill-opacity'?: string;
            };
          },
        ];
      }>;
    },
  ];
}
export type CategoricalLegend =
  | CategoricalPointLegend
  | CategoricalLineLegend
  | CategoricalPolygonLegend;
