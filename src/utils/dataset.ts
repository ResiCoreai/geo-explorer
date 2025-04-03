import { DatasetInfo } from '@ncsa/geo-explorer/utils/types';

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
