import { AddCircleOutline, RemoveCircle } from "@mui/icons-material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { IconButton } from "@mui/material";
import className from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { climateVariableIcons } from "../../../explore/Sidebar/utils/icons";
import {
  addLayer,
  removeLayer,
  selectDataset,
} from "../../../store/explore/slice";
import {
  truncateClimateDatasetPrefix,
  truncateClimateDatasetSuffix,
} from "../../../utils/dataset";
export function ClimateItem({ dataset, climateSelectedOption }) {
  const dispatch = useDispatch();
  const mapLayers = useSelector((state) => state.explore.mapLayers);
  const isSelected = mapLayers.some(
    (l) => l.data.layer_id === dataset.layer_id,
  );
  const unit =
    "unit" in dataset.dataset_info ? dataset.dataset_info.unit : "N/A";
  return (
    <div
      className={className(
        "group w-full flex flex-row items-center justify-between text-[14px] border border-solid",
        "rounded-md mb-2 transition-all duration-200",
        {
          "bg-[#F3F4F6] text-[#2C343C8A] border-[#D1D5DB]": isSelected,
          "bg-[#FFF] text-[#2C343C] border-[#D1D5DB] hover:border-[#13294B] hover:text-[#13294B]":
            !isSelected,
        },
        {
          "py-1": climateSelectedOption === "climate_scenario",
        },
      )}
    >
      {/* Left section: Icon + Name + Info */}
      <div className="flex flex-row gap-1 w-full flex-1 items-start ml-2 overflow-hidden">
        {/* Icon */}
        {/*Only show icon when climate scenario is selected and listing climate variables*/}
        {climateVariableIcons.map(({ type, icon }) => {
          var _a;
          return "climate_variable" in dataset.dataset_info &&
            ((_a = dataset.dataset_info) === null || _a === void 0
              ? void 0
              : _a.climate_variable) === type &&
            climateSelectedOption === "climate_scenario" ? (
            <div key={type} className="mt-0.5">
              {icon({ className: "w-4 h-4" })}
            </div>
          ) : null;
        })}

        {/* Text Content */}
        <div className="flex flex-col min-w-0 overflow-hidden">
          <div
            className={className(
              "capitalize transition-all",
              "overflow-hidden text-ellipsis whitespace-nowrap",
              "group-hover:whitespace-normal group-hover:overflow-visible",
            )}
          >
            {climateSelectedOption === "climate_variable"
              ? truncateClimateDatasetPrefix(dataset.display_name)
              : truncateClimateDatasetSuffix(dataset.display_name)}
          </div>
          {/*Only show unit when climate scenario is selected and listing climate variables*/}
          {climateSelectedOption === "climate_scenario" ? (
            <div
              className={className(
                "whitespace-nowrap italic overflow-hidden text-ellipsis capitalize text-[11px]",
                {
                  "text-[#2C343C8A]": isSelected,
                  "text-[#13294B8A]": !isSelected,
                },
              )}
            >
              {/*TODO* {modelCount} models • {unit}*/}
              {unit}
            </div>
          ) : null}
        </div>
      </div>

      {/* Right section: Buttons */}
      <div className="flex flex-row items-center ml-2">
        <IconButton
          size="small"
          className={className(
            "opacity-0 group-hover:opacity-100 transition-opacity",
            {
              "text-[#2C343C8A]": isSelected,
              "text-inherit": !isSelected,
            },
          )}
          onClick={() => {
            dispatch(selectDataset({ layer_id: dataset.layer_id }));
          }}
        >
          <DescriptionOutlinedIcon />
        </IconButton>

        {isSelected ? (
          <IconButton
            size="small"
            className="text-[#2C343C8A]"
            onClick={() => {
              dispatch(removeLayer({ layer_id: dataset.layer_id }));
            }}
          >
            <RemoveCircle />
          </IconButton>
        ) : (
          <IconButton
            size="small"
            className="group-hover:opacity-100 group-hover:text-inherit"
            onClick={() => {
              dispatch(addLayer({ layer_id: dataset.layer_id }));
            }}
          >
            <AddCircleOutline />
          </IconButton>
        )}
      </div>
    </div>
  );
}
