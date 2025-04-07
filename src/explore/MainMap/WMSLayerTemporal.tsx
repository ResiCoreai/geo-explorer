import { useEffect, useMemo } from 'react';
import { Layer, Source, useMap } from 'react-map-gl/maplibre';
import { useDispatch } from 'react-redux';

import { TILE_SIZE } from '@ncsa/geo-explorer/config';
import { AppDispatch } from '@ncsa/geo-explorer/store';
import { setTimestampIdx } from '@ncsa/geo-explorer/store/explore/slice';
import { MapLayer } from '@ncsa/geo-explorer/store/explore/types';
import { nextCircular, prevCircular } from '@ncsa/geo-explorer/utils/array';
import { makeWMSUrl } from '@ncsa/geo-explorer/utils/geoserver';

type Props = {
  layer: MapLayer;
  prevLayer: MapLayer | null;
};

export function WMSLayerTemporal({ layer, prevLayer }: Props) {
  const numTimestamps = layer.data.dataset_info.timestamps.length;

  const curTimestamp =
    numTimestamps > 0
      ? layer.data.dataset_info.timestamps[layer.timestampIdx]
      : '';
  const prevTimestamp =
    prevCircular(layer.data.dataset_info.timestamps, layer.timestampIdx) ?? '';
  const nextTimestamp =
    nextCircular(layer.data.dataset_info.timestamps, layer.timestampIdx) ?? '';

  const tiles = useMemo(() => {
    const params: Parameters<typeof makeWMSUrl>[0] = {
      layers: [layer.data.layer_id],
      __style_version__: layer.version,
    };
    if (curTimestamp) {
      params['time'] = curTimestamp;
    }
    return [makeWMSUrl(params)];
  }, [layer.timestampIdx, layer.version]);

  const prevTiles = useMemo(() => {
    const params: Parameters<typeof makeWMSUrl>[0] = {
      layers: [layer.data.layer_id],
      __style_version__: layer.version,
    };
    if (prevTimestamp) {
      params['time'] = prevTimestamp;
    }
    return [makeWMSUrl(params)];
  }, [layer.timestampIdx, layer.version]);

  const nextTiles = useMemo(() => {
    const params: Parameters<typeof makeWMSUrl>[0] = {
      layers: [layer.data.layer_id],
      __style_version__: layer.version,
    };
    if (nextTimestamp) {
      params['time'] = nextTimestamp;
    }
    return [makeWMSUrl(params)];
  }, [layer.timestampIdx, layer.version]);

  const dispatch = useDispatch<AppDispatch>();
  const { current: map } = useMap();

  useEffect(() => {
    if (!layer.playing) return;

    let scheduled = false;
    let timeoutId = -1;

    const checkIfNextTimestampLoaded = () => {
      if (
        map?.isSourceLoaded(layer.data.layer_id + nextTimestamp) &&
        !scheduled
      ) {
        scheduled = true;
        timeoutId = setTimeout(() => {
          dispatch(
            setTimestampIdx({
              layer_id: layer.data.layer_id,
              index:
                (layer.timestampIdx + 1) %
                layer.data.dataset_info.timestamps.length,
            }),
          );
        }, 1000);
      }
    };

    map?.on('sourcedata', checkIfNextTimestampLoaded);
    checkIfNextTimestampLoaded();

    return () => {
      clearTimeout(timeoutId);
      map?.off('sourcedata', checkIfNextTimestampLoaded);
    };
  }, [map, nextTimestamp, layer.playing]);

  return (
    <>
      <Source
        key={layer.data.layer_id + prevTimestamp}
        id={layer.data.layer_id + prevTimestamp}
        type="raster"
        tiles={prevTiles}
        tileSize={TILE_SIZE}
        // bounds={layer.data.bounds}
      >
        <Layer
          id={layer.data.layer_id + prevTimestamp}
          beforeId={prevLayer?.data.layer_id ?? ''}
          type="raster"
          layout={{
            visibility: layer.visible ? 'visible' : 'none',
          }}
          paint={{
            'raster-opacity': 0,
          }}
        />
      </Source>
      <Source
        key={layer.data.layer_id + curTimestamp}
        id={layer.data.layer_id + curTimestamp}
        type="raster"
        tiles={tiles}
        tileSize={TILE_SIZE}
        // bounds={layer.data.bounds}
      >
        <Layer
          id={layer.data.layer_id + curTimestamp}
          beforeId={layer.data.layer_id + prevTimestamp}
          type="raster"
          layout={{
            visibility: layer.visible ? 'visible' : 'none',
          }}
          paint={{
            'raster-opacity': layer.style.layerOpacity,
          }}
        />
      </Source>
      <Source
        key={layer.data.layer_id + nextTimestamp}
        id={layer.data.layer_id + nextTimestamp}
        type="raster"
        tiles={nextTiles}
        tileSize={TILE_SIZE}
        // bounds={layer.data.bounds}
      >
        <Layer
          id={layer.data.layer_id + nextTimestamp}
          beforeId={layer.data.layer_id + curTimestamp}
          type="raster"
          layout={{
            visibility: layer.visible ? 'visible' : 'none',
          }}
          paint={{
            'raster-opacity': 0,
          }}
        />
      </Source>
      <Layer
        id={layer.data.layer_id}
        beforeId={layer.data.layer_id + nextTimestamp}
        type="background"
        layout={{
          visibility: 'none',
        }}
      />
    </>
  );
}
