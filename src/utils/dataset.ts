import { Dataset, DatasetInfo } from '@ncsa/geo-explorer/types';
import { OGCClient } from '@ncsa/geo-explorer/utils/ogcClient';

export function isDatasetTypeMatch(
  datasetInfo: DatasetInfo,
  type: string,
): boolean {
  return (
    ('feature_type' in datasetInfo && datasetInfo['feature_type'] === type) ||
    ('dataset_type' in datasetInfo && datasetInfo['dataset_type'] === type)
  );
}

export function truncateClimateDatasetSuffix(input: string): string {
  const match = input.match(/Projection\s*(.+)/);
  if (match && match[1]) {
    return match[1].trim();
  }
  return input;
}

export function truncateClimateDatasetPrefix(input: string): string {
  const match = input.match(/^(.*?\bProjection)/i);
  return match?.[1]?.trim() ?? input;
}

export async function resolveFeatureType(
  dataset: Dataset,
  ogcClient: OGCClient,
): Promise<Dataset> {
  if (dataset.dataset_info.dataset_type === 'raster') {
    return dataset;
  }

  const featureType = await ogcClient.describeFeatureType(dataset);

  const geometryProperty = featureType?.featureTypes[0].properties.find(
    (prop) => prop.name === 'geom' || prop.name === 'the_geom',
  );

  if (!geometryProperty) {
    return dataset;
  }

  switch (geometryProperty.localType) {
    case 'Point':
    case 'MultiPoint':
      return {
        ...dataset,
        dataset_info: {
          ...dataset.dataset_info,
          feature_type: 'point',
        },
      };
    case 'LineString':
    case 'MultiLineString':
      return {
        ...dataset,
        dataset_info: {
          ...dataset.dataset_info,
          feature_type: 'line',
        },
      };
    case 'Polygon':
    case 'MultiPolygon':
      return {
        ...dataset,
        dataset_info: {
          ...dataset.dataset_info,
          feature_type: 'polygon',
        },
      };
  }
}
