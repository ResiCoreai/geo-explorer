import Box from '@mui/material/Box';
import { useContext, useEffect, useMemo, useState } from 'react';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';
import { MarkerLegendIcon } from '@ncsa/geo-explorer/explore/Sidebar/MapLayers/LegendIcon/MarkerLegendIcon';
import { MapLayer } from '@ncsa/geo-explorer/store/explore/types';
import { Legend, VectorSymbolizer } from '@ncsa/geo-explorer/types';

type Props = {
  layer: MapLayer;
};

type CategoricalColor = {
  color: string;
  label?: string;
};

export function VectorLegendIcon({ layer }: Props) {
  const { ogcClient } = useContext(GeoExplorerContext);

  const [legend, setLegend] = useState<Legend<VectorSymbolizer> | null>(null);

  useEffect(() => {
    ogcClient?.getLegendJSON<VectorSymbolizer>(layer.data).then(setLegend);
  }, [ogcClient]);

  const colorMap = useMemo<CategoricalColor[]>(() => {
    const rules = legend?.Legend?.[0]?.rules ?? [];

    const entries: CategoricalColor[] = [];

    rules.forEach((rule) => {
      const symbolizer = rule.symbolizers?.[0];

      // Point-based symbolizer
      if ('Point' in symbolizer) {
        const graphics = symbolizer?.Point?.graphics ?? [];
        const fill = graphics[0]?.fill;
        if (fill) {
          entries.push({
            color: fill,
            label: rule.title ?? rule.name,
          });
        }
      }

      // Line-based symbolizer
      if ('Line' in symbolizer) {
        const stroke = symbolizer?.Line?.stroke;
        if (stroke) {
          entries.push({
            color: stroke,
            label: rule.title ?? rule.name,
          });
        }
      }

      // polygon-based symbolizer
      if ('Polygon' in symbolizer) {
        const polygonFill = symbolizer?.Polygon?.fill;
        if (polygonFill) {
          entries.push({
            color: polygonFill,
            label: rule.title ?? rule.name,
          });
        }
      }
    });

    return entries;
  }, [legend]);

  const gradient = useMemo(() => {
    if (colorMap.length == 0) return '';

    if (colorMap.length === 1) {
      return colorMap[0]?.color || '#fff'; // solid fill
    }

    return `linear-gradient(180deg, ${colorMap.map((c) => c.color).join(', ')})`;
  }, [colorMap]);

  // Special case
  if (layer.data.layer_type === 'point' && colorMap.length === 1) {
    return <MarkerLegendIcon layer={layer} />;
  }

  return (
    <Box
      className="border border-black rounded-sm shadow-sm w-[18px] h-[18px] border-solid"
      sx={{
        background: gradient,
      }}
    />
  );
}
