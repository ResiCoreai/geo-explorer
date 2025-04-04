import { useEffect, useState } from "react";

import { MapLayer } from "@ncsa/geo-explorer/store/explore/types";
import { getLegendJSON } from "@ncsa/geo-explorer/utils/geoserver";
import { getImageBlobUrl } from "@ncsa/geo-explorer/utils/image";
import {
  CategoricalLegend,
  VectorDatasetInfo,
} from "@ncsa/geo-explorer/utils/types";

type Props = {
  layer: MapLayer & { data: { dataset_info: VectorDatasetInfo } };
};

export function SingleLegendIcon({ layer }: Props) {
  const [legend, setLegend] = useState<CategoricalLegend | null>(null);
  const [imageBlobUrl, setImageBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    getLegendJSON<CategoricalLegend>(layer.data.layer_id).then(setLegend);
  }, []);

  useEffect(() => {
    const fetchIcon = async () => {
      const rules = legend?.Legend?.[0]?.rules ?? [];

      for (const rule of rules) {
        for (const symbolizer of rule.symbolizers ?? []) {
          if ("Point" in symbolizer) {
            const rawUrl = symbolizer?.Point?.url;
            if (rawUrl) {
              const decoded = decodeURIComponent(rawUrl);
              // TODO: make this pattern configurable
              const cleaned = decoded.replace(/\/DAC:([^/?#]+)/, "/$1");

              try {
                const objectUrl = await getImageBlobUrl({ url: cleaned });
                setImageBlobUrl(objectUrl);
                return;
              } catch (err) {
                console.error("Failed to fetch icon with auth:", err);
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
