import { MapLayer } from '@ncsa/geo-explorer/store/explore/types';

import { RasterLegendIcon } from './RasterLegendIcon';
import { VectorLegendIcon } from './VectorLegendIcon';

type Props = {
  layer: MapLayer;
};

export function LegendIcon({ layer }: Props) {
  switch (layer.data.layer_type) {
    case 'point':
    case 'line':
    case 'polygon':
      return <VectorLegendIcon layer={layer} />;
    case 'raster':
      return <RasterLegendIcon layer={layer} />;
  }
}