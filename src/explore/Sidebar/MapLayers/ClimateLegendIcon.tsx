import Box from "@mui/material/Box";
import { useEffect, useMemo, useState } from "react";

import { MapLayer } from "@ncsa/geo-explorer/store/explore/types";
import { getLegendJSON } from "@ncsa/geo-explorer/utils/geoserver";
import {
  ClimateDatasetInfo,
  RasterLegend,
} from "@ncsa/geo-explorer/utils/types";

type Props = {
  layer: MapLayer & { data: { dataset_info: ClimateDatasetInfo } };
};

export function ClimateLegendIcon({ layer }: Props) {
  const [legend, setLegend] = useState<RasterLegend | null>(null);

  useEffect(() => {
    getLegendJSON<RasterLegend>(layer.data.layer_id).then(setLegend);
  }, []);

  const colorMap = useMemo(() => {
    return (
      legend?.Legend?.[0]?.rules[0]?.symbolizers[0]?.Raster.colormap.entries ??
      []
    );
  }, [legend]);

  const gradient = useMemo(() => {
    if (!colorMap.length) return "";
    return `linear-gradient(180deg, ${colorMap.map((e) => e.color).join(", ")})`;
  }, [colorMap]);

  return (
    <Box
      className="border border-black rounded-sm shadow-sm w-[18px] h-[18px] border-solid"
      sx={{
        background: gradient,
      }}
    />
  );
}
