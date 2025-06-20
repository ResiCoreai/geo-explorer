import { Box, Divider, Typography } from '@mui/material';

import { layerTypeIcons } from '@ncsa/geo-explorer/explore/Sidebar/utils/icons';
import { RootState, useSelector } from '@ncsa/geo-explorer/store';

export const DatasetInfo = () => {
  const dataset = useSelector(
    (state: RootState) =>
      state.explore.simpleLayerInventory.find(
        (dataset) => dataset.layer_id === state.explore.selectedDataset,
      ) ||
      state.explore.temporalLayerInventory.find(
        (dataset) => dataset.layer_id === state.explore.selectedDataset,
      ),
  );

  if (!dataset) return null;

  return (
    <Box className="p-4">
      <Box className="flex flex-col md:flex-row">
        {/* Description Section */}
        <Box className="flex-1 pr-0 md:pr-4">
          <Typography className="text-[16px] font-semibold">
            Description
          </Typography>
          <Box className="mt-2">
            <Typography variant="body2" className="text-gray-600">
              {dataset.description}
            </Typography>
          </Box>
        </Box>

        {/* Divider */}
        <Divider orientation="vertical" flexItem className="my-4 md:my-0" />

        {/* Attributes Section */}
        <Box className="flex-1 pl-0 md:pl-4">
          <Typography className="text-[16px] font-semibold">
            Attributes
          </Typography>

          {/* Dataset Category */}
          <Box className="mt-2 flex justify-between items-center">
            <Typography variant="body2" color="gray">
              Dataset Category
            </Typography>
            <Typography className="text-right capitalize">
              {dataset.labels.dataset_category}
            </Typography>
          </Box>

          {/* Layer Type */}
          <Box className="mt-2 flex justify-between items-center">
            <Typography variant="body2" color="gray">
              Layer Type
            </Typography>
            <Box className="flex items-center">
              <Box className="flex items-center">
                {layerTypeIcons[dataset.layer_type]?.({
                  className: 'text-red-500',
                })}
                <Typography className="ml-2 capitalize">
                  {dataset.layer_type}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Dataset Source */}
          <Box className="mt-2 flex justify-between items-center">
            <Typography variant="body2" color="gray">
              Data Source
            </Typography>
            <Typography className="text-right capitalize">N/A</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
