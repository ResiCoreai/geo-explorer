import Box from '@mui/material/Box';
import { useContext, useEffect, useMemo, useState } from 'react';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';
import { MapLayer } from '@ncsa/geo-explorer/store/explore/types';
import { Legend, RasterSymbolizer } from '@ncsa/geo-explorer/types';

export type RasterLegendIconProps = {
  layer: MapLayer;
};

export function RasterLegendIcon({ layer }: RasterLegendIconProps) {
  const { ogcClient } = useContext(GeoExplorerContext);

  const [legend, setLegend] = useState<Legend<RasterSymbolizer> | null>(null);

  useEffect(() => {
    ogcClient?.getLegendJSON<RasterSymbolizer>(layer.data).then(setLegend);
  }, [ogcClient]);

  const colorMap = useMemo(() => {
    return (
      legend?.Legend?.[0]?.rules[0]?.symbolizers[0]?.Raster.colormap.entries ??
      []
    );
  }, [legend]);

  const gradient = useMemo(() => {
    if (!colorMap.length) return '';
    return `linear-gradient(180deg, ${colorMap.map((e) => e.color).join(', ')})`;
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
