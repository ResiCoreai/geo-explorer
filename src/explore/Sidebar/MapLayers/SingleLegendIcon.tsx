import { useContext, useEffect, useState } from 'react';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';
import { MapLayer } from '@ncsa/geo-explorer/store/explore/types';
import { CategoricalLegend, VectorDatasetInfo } from '@ncsa/geo-explorer/types';

type Props = {
  layer: MapLayer & { data: { dataset_info: VectorDatasetInfo } };
};

export function SingleLegendIcon({ layer }: Props) {
  const { ogcClient } = useContext(GeoExplorerContext);

  const [legend, setLegend] = useState<CategoricalLegend | null>(null);
  const [imageBlobUrl, setImageBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    ogcClient
      ?.getLegendJSON<CategoricalLegend>(layer.data.layer_id)
      .then(setLegend);
  }, [ogcClient]);

  useEffect(() => {
    const fetchIcon = async () => {
      const rules = legend?.Legend?.[0]?.rules ?? [];

      for (const rule of rules) {
        for (const symbolizer of rule.symbolizers ?? []) {
          if ('Point' in symbolizer) {
            const rawUrl = symbolizer?.Point?.url;
            if (rawUrl) {
              const decoded = decodeURIComponent(rawUrl);
              // TODO: make this pattern configurable
              const cleaned = decoded.replace(/\/DAC:([^/?#]+)/, '/$1');

              try {
                const objectUrl = await ogcClient?.getImageBlobUrl({
                  url: cleaned,
                });
                if (objectUrl) {
                  setImageBlobUrl(objectUrl);
                }
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

  return (
    <img
      src={imageBlobUrl}
      alt="Legend Icon"
      title="Legend Icon"
      className="inline-block object-contain w-[18px] h-[18px] translate-y-[-2px]"
    />
  );
}
