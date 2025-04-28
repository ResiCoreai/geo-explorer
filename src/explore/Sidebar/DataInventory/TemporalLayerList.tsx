import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { Box, Link } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';

import { CLIMATE_MODEL_INFO_URL } from '@ncsa/geo-explorer/config';
import {
  climateScenarioIcons,
  climateVariableIcons,
  typeDescription,
} from '@ncsa/geo-explorer/explore/Sidebar/utils/icons';
import { ClimateDatasetInfo, Dataset } from '@ncsa/geo-explorer/types';

import { TemporalLayerItem } from './TemporalLayerItem';

export type TemporalLayerListProps = {
  climateDatasets: Dataset[];
  climateSelectedOption: keyof ClimateDatasetInfo;
};

export function TemporalLayerList({
  climateDatasets,
  climateSelectedOption,
}: TemporalLayerListProps) {
  const iconList =
    climateSelectedOption === 'climate_variable'
      ? climateVariableIcons
      : climateScenarioIcons;

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
    <Box className="flex-auto overflow-scroll no-scrollbar">
      {/* Summary Line */}
      <Box className="flex justify-between text-[12px] text-[#13294B99] px-[32px] mt-4">
        <span>
          {/*TODO remove hard coded text*/}
          {climateSelectedOption === 'climate_scenario'
            ? '5 scenario project'
            : '9 variables'}
        </span>
        <span>
          Source: &nbsp;
          <Link
            href={CLIMATE_MODEL_INFO_URL}
            target="_blank"
            className="text-[#6B7280] decoration-[#6B7280]"
          >
            NCCS
          </Link>
        </span>
      </Box>
      {iconList.map(({ type, icon }) => {
        const filteredDatasets = climateDatasets.filter(
          (layer) =>
            (layer.dataset_info as ClimateDatasetInfo)[
              climateSelectedOption
            ] === type,
        );

        const isExpanded = expandedSections[type];

        return (
          <Box
            className="flex-auto overflow-scroll no-scrollbar px-[32px] my-2"
            key={type}
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
              onClick={() => toggleSection(type)}
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
                {climateSelectedOption === 'climate_variable' && (
                  <div className="mt-0.5 mr-1">
                    {icon({ className: 'w-4 h-4' })}
                  </div>
                )}
                <Box className="flex flex-col text-left">
                  <span
                    className={classNames('text-sm text-[#2C343C]', {
                      'font-semibold': isExpanded,
                      'font-normal': !isExpanded,
                    })}
                  >
                    {typeDescription[type]?.description ?? type}
                  </span>
                  {climateSelectedOption === 'climate_variable' && (
                    <span className="italic text-[11px] capitalize text-[#13294B8A]">
                      {typeDescription[type]?.units ?? ''}
                    </span>
                  )}
                </Box>
              </Box>

              {/*TODO need add logic of model count/ unit*/}
              {/*<span className="italic text-xs text-[#6B7280]">{*/}
              {/*  filteredDatasets.length > 0 ? `${filteredDatasets.length} models` : 'N/A'*/}
              {/*}</span>*/}
            </Box>

            {/* Dataset List */}
            {isExpanded && (
              <Box className="flex flex-col px-4 bg-[#F3F4F6] rounded-sm">
                {filteredDatasets.length > 0 ? (
                  filteredDatasets.map((climateDataset) => (
                    <TemporalLayerItem
                      key={climateDataset.layer_id}
                      dataset={climateDataset}
                      climateSelectedOption={climateSelectedOption}
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
  );
}
