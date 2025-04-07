import { useEffect, useState } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';

import { getLegendJSON } from '../../../utils/geoserver';
import { getImageBlobUrl } from '../../../utils/image';

export function SingleLegendIcon({ layer }) {
  const [legend, setLegend] = useState(null);
  const [imageBlobUrl, setImageBlobUrl] = useState(null);
  useEffect(() => {
    getLegendJSON(layer.data.layer_id).then(setLegend);
  }, []);
  useEffect(() => {
    const fetchIcon = async () => {
      var _a, _b, _c, _d, _e;
      const rules =
        (_c =
          (_b =
            (_a =
              legend === null || legend === void 0 ? void 0 : legend.Legend) ===
              null || _a === void 0
              ? void 0
              : _a[0]) === null || _b === void 0
            ? void 0
            : _b.rules) !== null && _c !== void 0
          ? _c
          : [];
      for (const rule of rules) {
        for (const symbolizer of (_d = rule.symbolizers) !== null &&
        _d !== void 0
          ? _d
          : []) {
          if ('Point' in symbolizer) {
            const rawUrl =
              (_e =
                symbolizer === null || symbolizer === void 0
                  ? void 0
                  : symbolizer.Point) === null || _e === void 0
                ? void 0
                : _e.url;
            if (rawUrl) {
              const decoded = decodeURIComponent(rawUrl);
              // TODO: make this pattern configurable
              const cleaned = decoded.replace(/\/DAC:([^/?#]+)/, '/$1');
              try {
                const objectUrl = await getImageBlobUrl({ url: cleaned });
                setImageBlobUrl(objectUrl);
                return;
              } catch (err) {
                console.error('Failed to fetch icon with auth:', err);
                return;
              }
            }
          }
        }
      }
    };
    if (legend) {
      fetchIcon();
    }
  }, [legend]);
  if (!imageBlobUrl) return null;
  return _jsx('img', {
    src: imageBlobUrl,
    alt: 'Legend Icon',
    title: 'Legend Icon',
    className:
      'inline-block object-contain w-[18px] h-[18px] translate-y-[-2px]',
  });
}
