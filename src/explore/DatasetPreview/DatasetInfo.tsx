import { Box, Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import {
  climateVariableIcons,
  layerTypeIcons,
  typeDescription,
} from '@ncsa/geo-explorer/explore/Sidebar/utils/icons';
import { RootState } from '@ncsa/geo-explorer/store';
import { ClimateDatasetInfo, VectorDatasetInfo } from '@ncsa/geo-explorer/utils/types';

export const DatasetInfo = () => {
  const dataset = useSelector(
    (state: RootState) =>
      state.explore.dataInventory.find(
        (dataset) => dataset.layer_id === state.explore.selectedDataset,
      ) ||
      state.explore.climateInventory.find(
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

          {/* Dataset Type */}
          <Box className="mt-2 flex justify-between items-center">
            <Typography variant="body2" color="gray">
              Dataset Type
            </Typography>
            <Typography className="text-right capitalize">
              {dataset.dataset_info?.dataset_category === 'climate'
                ? 'Climate'
                : 'DAC Tech'}
            </Typography>
          </Box>

          {/* Dataset Category */}
          <Box className="mt-2 flex justify-between items-center">
            <Typography variant="body2" color="gray">
              Dataset Category
            </Typography>
            <Typography className="text-right capitalize">
              {dataset.dataset_info.dataset_category}
            </Typography>
          </Box>

          {/* Layer Type */}
          <Box className="mt-2 flex justify-between items-center">
            <Typography variant="body2" color="gray">
              Layer Type
            </Typography>
            <Box className="flex items-center">
              {layerTypeIcons.map(({ type, icon }) =>
                (dataset.dataset_info as VectorDatasetInfo)?.feature_type ===
                type ? (
                  <Box key={type} className="flex items-center">
                    {icon({ className: 'text-red-500' })}
                    <Typography className="ml-2 capitalize">{type}</Typography>
                  </Box>
                ) : null,
              )}
              {/* Climate Variable Icons */}
              {climateVariableIcons.map(({ type, icon }) =>
                (dataset.dataset_info as ClimateDatasetInfo)
                  ?.climate_variable === type ? (
                  <Box key={type} className="flex items-center">
                    {icon({ className: 'text-red-500' })}
                    <Typography className="ml-2 capitalize">
                      {typeDescription[type]?.description ?? type}
                    </Typography>
                  </Box>
                ) : null,
              )}
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
