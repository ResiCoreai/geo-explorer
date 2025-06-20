import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { Box, InputAdornment, MenuItem, Select } from '@mui/material';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';

import { useImplementation } from '@ncsa/geo-explorer/hooks/useImplementation';
import { RootState, useSelector } from '@ncsa/geo-explorer/store';
import { Dataset } from '@ncsa/geo-explorer/types';

export function TemporalLayerList() {
  const { TemporalLayerItem } = useImplementation();

  const datasets = useSelector(
    (state: RootState) => state.explore.temporalLayerInventory,
  );

  const groupByOptions = useMemo(() => {
    return Array.from(
      new Set(datasets.flatMap((dataset) => Object.keys(dataset.labels))),
    );
  }, [datasets]);

  const [groupBy, setGroupBy] = useState('');
  useEffect(() => {
    if (!groupBy && groupByOptions[0]) {
      setGroupBy(groupByOptions[0]);
    }
  }, [groupByOptions]);

  const datasetGroups: Record<string, Dataset[]> = useMemo(() => {
    const groups: Record<string, Dataset[]> = {};
    for (const dataset of datasets) {
      const groupKey = dataset.labels[groupBy] ?? '';
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(dataset);
    }
    return groups;
  }, [datasets, groupBy]);

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (type: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <>
      <Box mt={2} className="flex-none px-[32px]">
        <Select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          fullWidth
          variant="standard"
          disableUnderline
          className="capitalize bg-[#F3F4F6] text-[14px] h-[34px] px-4 py-2 rounded-sm shadow-sm focus:bg-[#F3F4F6] hover:bg-[#F3F4F6] flex items-center"
          startAdornment={
            <InputAdornment
              className="text-gray-600 text-[14px]"
              position="start"
            >
              <FolderOpenOutlinedIcon />
            </InputAdornment>
          }
        >
          {groupByOptions.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{ textTransform: 'capitalize' }}
            >
              {option.replace(/_/g, ' ')}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box className="flex-auto overflow-scroll no-scrollbar">
        {/* Summary Line */}
        <Box className="flex justify-between text-[12px] text-[#13294B99] px-[32px] mt-4">
          <span>{Object.keys(datasetGroups).length} groups</span>
        </Box>
        {Object.entries(datasetGroups).map(([groupKey, datasets]) => {
          const isExpanded = expandedSections[groupKey];
          return (
            <Box
              className="flex-auto overflow-scroll no-scrollbar px-[32px] my-2"
              key={groupKey}
            >
              {/* Section Header */}
              <Box
                className={classNames(
                  'flex items-center justify-between px-2 py-2 cursor-pointer transition-colors',
                  {
                    'bg-[#F3F4F6] rounded-sm': isExpanded,
                    'bg-white rounded-md border border-solid border-[#D1D5DB] hover:border-[#13294B] hover:text-[#13294B]':
                      !isExpanded,
                  },
                )}
                onClick={() => toggleSection(groupKey)}
              >
                <Box className="flex items-start overflow-hidden">
                  <NavigateNextOutlinedIcon
                    className={classNames(
                      'w-5 h-5 text-[#2C343C] transition-transform',
                      {
                        'rotate-90': isExpanded,
                      },
                    )}
                  />
                  <Box className="flex flex-col text-left">
                    <span
                      className={classNames(
                        'text-sm text-[#2C343C] capitalize',
                        {
                          'font-semibold': isExpanded,
                          'font-normal': !isExpanded,
                        },
                      )}
                    >
                      {groupKey}
                    </span>
                  </Box>
                </Box>
              </Box>

              {/* Dataset List */}
              {isExpanded && (
                <Box className="flex flex-col px-4 bg-[#F3F4F6] rounded-sm">
                  {datasets.length > 0 ? (
                    datasets.map((dataset) => (
                      <TemporalLayerItem
                        key={dataset.layer_id}
                        dataset={dataset}
                      />
                    ))
                  ) : (
                    <Box className="text-gray-400 text-sm italic">
                      Datasets will be available soon...
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </>
  );
}
