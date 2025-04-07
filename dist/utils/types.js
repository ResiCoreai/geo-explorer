export function isClimateData(layer) {
  return layer.data.dataset_info.dataset_category === 'climate';
}
export function isCategoricalData(layer) {
  return layer.data.dataset_info.dataset_category !== 'storage';
}
export function isSingleCategoryData(layer) {
  return layer.data.dataset_info.dataset_category === 'storage';
}
export function isVectorData(layer) {
  return layer.data.dataset_info.dataset_type === 'vector';
}
