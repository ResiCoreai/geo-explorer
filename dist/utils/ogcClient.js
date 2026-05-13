import axios from 'axios';
import { TILE_SIZE } from '../config';
export class OGCClient {
    constructor(options) {
        this.request = axios.create();
        if (options.accessToken) {
            this.request.interceptors.request.use((config) => {
                config.headers['Authorization'] = `Bearer ${options.accessToken}`;
                return config;
            }, null);
        }
    }
    makeUrl(url, params) {
        return (url +
            '?' +
            new URLSearchParams(Object.entries(params).map(([key, value]) => [key, String(value)])).toString());
    }
    makeWMSUrl(serviceUrl, options) {
        return (this.makeUrl(`${serviceUrl}/wms`, {
            format: 'image/png',
            service: 'WMS',
            version: '1.3.0',
            request: 'GetMap',
            srs: 'EPSG:3857',
            width: TILE_SIZE,
            height: TILE_SIZE,
            transparent: true,
            ...options,
        }) + '&bbox={bbox-epsg-3857}');
    }
    async getImageBlobUrl(config) {
        const { data: blob } = await this.request({
            ...config,
            responseType: 'blob',
        });
        return URL.createObjectURL(blob);
    }
    async getLegendImageObjectUrl(dataset) {
        return this.getImageBlobUrl({
            url: `${dataset.ogc_service_url}/wms`,
            params: {
                request: 'GetLegendGraphic',
                version: '1.0.0',
                format: 'image/png',
                layer: dataset.layer_id,
            },
        });
    }
    async getStyleNames(dataset) {
        var _a;
        // If not set default to layer workspace
        const styleWorkspace = (_a = dataset.default_style_workspace) !== null && _a !== void 0 ? _a : dataset.workspace;
        const { data } = await this.request({
            url: `${dataset.ogc_service_url}/rest/workspaces/${styleWorkspace}/styles.json`,
        });
        return data.styles.style.map((s) => s.name);
    }
    async getLegendJSON(dataset) {
        const { data } = await this.request({
            url: `${dataset.ogc_service_url}/wms`,
            params: {
                version: '1.3.0',
                request: 'GetLegendGraphic',
                format: 'application/json',
                layer: dataset.layer_id,
            },
        });
        return data;
    }
    sendWFSRequest(serviceUrl, options, config) {
        return this.request({
            url: this.makeUrl(`${serviceUrl}/wfs`, {
                service: 'WFS',
                version: '2.0.0',
                request: 'GetFeature',
                srsName: 'EPSG:4326',
                outputFormat: 'application/json',
                ...options,
            }),
            ...config,
        });
    }
    async downloadDataset(dataset) {
        try {
            const { data } = await this.sendWFSRequest(dataset.ogc_service_url, {
                typeNames: dataset.layer_id,
                outputFormat: 'csv',
            }, {
                responseType: 'blob',
            });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(data);
            a.download = name + '.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        catch {
            // TODO: show error message
        }
    }
    async describeFeatureType(dataset) {
        const { data } = await this.sendWFSRequest(dataset.ogc_service_url, {
            typeName: dataset.layer_id,
            request: 'DescribeFeatureType',
        });
        return data;
    }
    async identifyFeature(e, dataset) {
        const map = e.target;
        const mousePosition = map.project(e.lngLat);
        const margin = 5;
        const sw = map.unproject([
            mousePosition.x - margin,
            mousePosition.y + margin,
        ]);
        const ne = map.unproject([
            mousePosition.x + margin,
            mousePosition.y - margin,
        ]);
        const { data } = await this.sendWFSRequest(dataset.ogc_service_url, {
            typeName: dataset.layer_id,
            bbox: [sw.lat, sw.lng, ne.lat, ne.lng],
            count: 10,
        });
        return data.features;
    }
}
//# sourceMappingURL=ogcClient.js.map