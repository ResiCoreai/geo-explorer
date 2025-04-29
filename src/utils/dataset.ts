import { Dataset } from '@ncsa/geo-explorer/types';
import { OGCClient } from '@ncsa/geo-explorer/utils/ogcClient';

export async function resolveFeatureType(
  dataset: Dataset,
  ogcClient: OGCClient,
): Promise<Dataset> {
  if (dataset.layer_type === 'raster') {
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
        labels: {
          ...dataset.labels,
          feature_type: 'point',
        },
      };
    case 'LineString':
    case 'MultiLineString':
      return {
        ...dataset,
        labels: {
          ...dataset.labels,
          feature_type: 'line',
        },
      };
    case 'Polygon':
    case 'MultiPolygon':
      return {
        ...dataset,
        labels: {
          ...dataset.labels,
          feature_type: 'polygon',
        },
      };
  }
}
