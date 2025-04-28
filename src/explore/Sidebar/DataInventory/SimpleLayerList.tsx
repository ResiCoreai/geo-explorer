import { FilterAltOutlined, Search } from '@mui/icons-material';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';
import {
  categoryIcons,
  layerTypeIcons,
} from '@ncsa/geo-explorer/explore/Sidebar/utils/icons';
import { DatabaseHeavy } from '@ncsa/geo-explorer/icons/DatabaseHeavy';
import { RootState } from '@ncsa/geo-explorer/store';
import {
  ClimateDatasetInfo,
  VectorDatasetInfo,
} from '@ncsa/geo-explorer/types';

export function SimpleLayerList() {
  const { SimpleLayerItem, SidebarSection, TemporalLayerList } =
    useContext(GeoExplorerContext).components;

  const techDatasets = useSelector(
    (state: RootState) => state.explore.simpleLayerInventory,
  );

  const climateDatasets = useSelector(
    (state: RootState) => state.explore.temporalLayerInventory,
  );

  const [tabIndex, setTabIndex] = useState(0);
  const [techSelectedOption, setTechSelectedOption] =
    useState<keyof VectorDatasetInfo>('dataset_category');
  const [climateSelectedOption, setClimateSelectedOption] =
    useState<keyof ClimateDatasetInfo>('climate_scenario');

  const handleTechSelectChange = (
    event: SelectChangeEvent<keyof VectorDatasetInfo>,
  ) => {
    setTechSelectedOption(event.target.value as keyof VectorDatasetInfo);
  };
  const handleClimateSelectChange = (
    event: SelectChangeEvent<keyof ClimateDatasetInfo>,
  ) => {
    setClimateSelectedOption(event.target.value as keyof ClimateDatasetInfo);
  };

  return (
    <SidebarSection
      icon={<DatabaseHeavy size={16} />}
      weight={2}
      title="Data Inventory"
      extras={
        <Box className="flex flex-row gap-[6px]">
          <IconButton size="small" onClick={(e) => e.stopPropagation()}>
            <Search className="text-[#0000008A]" />
          </IconButton>
          <IconButton size="small" onClick={(e) => e.stopPropagation()}>
            <FilterAltOutlined className="text-[#0000008A]" />
          </IconButton>
        </Box>
      }
    >
      <Box className="flex flex-col h-full">
        {/* Tabs for DAC Tech & Climate Data */}
        <Box className="flex-none px-[32px]">
          <Tabs
            centered
            className="w-full"
            value={tabIndex}
            onChange={(_, newValue) => setTabIndex(newValue)}
          >
            <Tab label="DAC Tech" className="flex-1 min-w-0 capitalize" />
            <Tab label="Climate Data" className="flex-1 min-w-0 capitalize" />
          </Tabs>
        </Box>

        {/* Content for DAC Tech */}
        {tabIndex === 0 && (
          <>
            <Box mt={2} className="flex-none px-[32px]">
              <Select
                value={techSelectedOption}
                onChange={handleTechSelectChange}
                fullWidth
                variant="standard"
                disableUnderline
                className="bg-[#F3F4F6] text-[14px] h-[34px] px-4 py-2 rounded-sm shadow-sm focus:bg-[#F3F4F6] hover:bg-[#F3F4F6] flex items-center"
                startAdornment={
                  <InputAdornment
                    className="text-gray-600 text-[14px]"
                    position="start"
                  >
                    <FolderOpenOutlinedIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="dataset_category">Dataset Category</MenuItem>
                <MenuItem value="feature_type">Feature Type</MenuItem>
              </Select>
            </Box>
            <Box className="flex-auto overflow-scroll no-scrollbar">
              {(techSelectedOption === 'feature_type'
                ? layerTypeIcons
                : categoryIcons
              ).map(({ type, icon }) => (
                <Box className="my-[20px]" key={type}>
                  <Box className="flex flex-row items-center gap-[6px] text-[#13294B99] text-[11px] px-[32px] capitalize font-bold">
                    {icon({ className: 'w-5 h-5' })}
                    {type}{' '}
                    {techSelectedOption === 'feature_type' ? 'Feature' : 'Data'}
                  </Box>
                  <Box className="mt-[5px]">
                    {techDatasets.filter(
                      (layer) =>
                        (layer.dataset_info.dataset_type === 'raster'
                          ? 'raster'
                          : layer.dataset_info?.[techSelectedOption]) === type,
                    ).length > 0 ? (
                      techDatasets
                        .filter(
                          (layer) =>
                            (layer.dataset_info.dataset_type === 'raster'
                              ? 'raster'
                              : layer.dataset_info?.[techSelectedOption]) ===
                            type,
                        )
                        .map((dataset) => (
                          <Box
                            key={dataset.layer_id}
                            className="flex justify-center px-[32px]"
                          >
                            <SimpleLayerItem dataset={dataset} />
                          </Box>
                        ))
                    ) : (
                      <Box className="text-gray-400 text-sm italic px-[32px]">
                        Datasets will be available soon...
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        )}

        {/* Content for Climate Data */}
        {tabIndex === 1 && (
          <>
            <Box mt={2} className="flex-none px-[32px]">
              <Select
                value={climateSelectedOption}
                onChange={handleClimateSelectChange}
                fullWidth
                variant="standard"
                disableUnderline
                className="bg-[#F3F4F6] text-[14px] h-[34px] px-4 py-2 rounded-sm shadow-sm focus:bg-[#F3F4F6] hover:bg-[#F3F4F6] flex items-center"
                startAdornment={
                  <InputAdornment
                    className="text-gray-600 text-[14px]"
                    position="start"
                  >
                    <FolderOpenOutlinedIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="climate_scenario">
                  Climate Model Scenarios
                </MenuItem>
                <MenuItem value="climate_variable">Climate Variables</MenuItem>
              </Select>
            </Box>
            <TemporalLayerList
              climateDatasets={climateDatasets}
              climateSelectedOption={climateSelectedOption}
            />
          </>
        )}
      </Box>
    </SidebarSection>
  );
}
