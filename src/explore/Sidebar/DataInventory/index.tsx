import { FilterAltOutlined, Search } from '@mui/icons-material';
import { Box, IconButton, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

import { SimpleLayerList } from '@ncsa/geo-explorer/explore/Sidebar/DataInventory/SimpleLayerList';
import { TemporalLayerList } from '@ncsa/geo-explorer/explore/Sidebar/DataInventory/TemporalLayerList';
import { Section } from '@ncsa/geo-explorer/explore/Sidebar/Section';
import { DatabaseHeavy } from '@ncsa/geo-explorer/icons/DatabaseHeavy';

export function DataInventory() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Section
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
        <Box className="flex-none px-[32px]">
          <Tabs
            centered
            className="w-full"
            value={tabIndex}
            onChange={(_, newValue) => setTabIndex(newValue)}
          >
            <Tab
              label="Vector Datasets"
              className="flex-1 min-w-0 capitalize"
            />
            <Tab
              label="Raster Datasets"
              className="flex-1 min-w-0 capitalize"
            />
          </Tabs>
        </Box>
        {tabIndex === 0 && <SimpleLayerList />}
        {tabIndex === 1 && <TemporalLayerList />}
      </Box>
    </Section>
  );
}
