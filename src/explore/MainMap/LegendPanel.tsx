import CloseFullscreenOutlinedIcon from '@mui/icons-material/CloseFullscreenOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  Switch,
  Typography,
} from '@mui/material';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';

import { MapLayer } from '@ncsa/geo-explorer/store/explore/types';
import { getLegendImageObjectUrl } from '@ncsa/geo-explorer/utils/geoserver';

type Props = {
  layers: MapLayer[];
  selectedLayer: MapLayer;
};

export function LegendPanel({ layers, selectedLayer }: Props) {
  const auth = useAuth();

  const [showAll, setShowAll] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [legendUrls, setLegendUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchLegend = async (layer: MapLayer) => {
      const layerId = layer.data?.layer_id;
      const token = auth.user?.access_token;
      if (!layerId || !token) return;

      try {
        const blobUrl = await getLegendImageObjectUrl(layerId);
        setLegendUrls((prev) => ({
          ...prev,
          [layerId]: blobUrl,
        }));
      } catch (err) {
        console.error(`Error loading legend for ${layerId}:`, err);
      }
    };

    const targetLayers = showAll ? layers : [selectedLayer];

    setLegendUrls({});
    targetLayers.forEach(fetchLegend);
  }, [layers, selectedLayer, showAll, auth.user?.access_token]);

  const visibleLayers = showAll ? layers : [selectedLayer];

  return (
    <Box className="w-[260px] rounded-lg shadow border border-gray-300 bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <Box className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <Typography className="text-[#2C343C] tracking-wide uppercase font-[400] text-[14px]">
          Legend List
        </Typography>
        <IconButton
          size="small"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? 'Expand legend' : 'Collapse legend'}
        >
          {collapsed ? (
            <OpenInFullOutlinedIcon fontSize="inherit" />
          ) : (
            <CloseFullscreenOutlinedIcon fontSize="inherit" />
          )}
        </IconButton>
      </Box>

      <Divider />

      {/* Collapsible Content */}
      <Collapse in={!collapsed}>
        <Box className="overflow-y-auto max-h-[500px]">
          {visibleLayers.map((layer, index) => {
            const isSelected =
              layer.data.layer_id === selectedLayer.data.layer_id;
            const title = layer.data.display_name || layer.data.layer_id;
            const legendUrl = legendUrls[layer.data.layer_id];

            return (
              <Box key={layer.data.layer_id}>
                <Box
                  className={classNames(
                    'px-4 pt-3 pb-2',
                    showAll && isSelected && 'bg-blue-50',
                  )}
                >
                  <Typography className="text-[14px] font-[600] text-[#2C343C] leading-tight">
                    {title}
                  </Typography>

                  {legendUrl && (
                    <Box className="pt-2 pb-1">
                      <img
                        src={legendUrl}
                        alt={`Legend for ${title}`}
                        className="object-contain"
                      />
                    </Box>
                  )}
                </Box>

                {index < visibleLayers.length - 1 && (
                  <Divider className="-mx-4" />
                )}
              </Box>
            );
          })}
        </Box>

        {/* Footer toggle */}
        <Divider />
        <Box className="border-t border-gray-200 px-4 py-2 flex items-center justify-end gap-2">
          <Typography className="text-sm text-gray-700">
            Show all visible legends
          </Typography>
          <Switch
            checked={showAll}
            onChange={() => setShowAll((prev) => !prev)}
            size="small"
          />
        </Box>
      </Collapse>
    </Box>
  );
}
