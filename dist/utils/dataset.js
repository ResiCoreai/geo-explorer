export async function resolveFeatureType(dataset, ogcClient) {
    if (dataset.layer_type === 'raster') {
        return dataset;
    }
    const featureType = await ogcClient.describeFeatureType(dataset);
    const geometryProperty = featureType === null || featureType === void 0 ? void 0 : featureType.featureTypes[0].properties.find((prop) => prop.name === 'geom' || prop.name === 'the_geom');
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
//# sourceMappingURL=dataset.js.map