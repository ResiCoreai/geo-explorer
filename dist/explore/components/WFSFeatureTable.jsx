import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedFeatures } from "../../store/explore/slice";
import { sendWFSRequest } from "../../utils/geoserver";
export function WFSFeatureTable({ dataset }) {
  const dispatch = useDispatch();
  const [features, setFeatures] = useState([]);
  const [featureAttributes, setFeatureAttributes] = useState([]);
  const columns = useMemo(() => {
    const keys = [
      ...new Set(
        featureAttributes.flatMap((attributes) =>
          Object.keys(
            attributes !== null && attributes !== void 0 ? attributes : {},
          ),
        ),
      ),
    ];
    return keys.map((key) => ({
      field: key,
      headerName: key,
      headerClassName: "bg-[#00000000]",
      sortable: false,
    }));
  }, [featureAttributes]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (dataset.dataset_info.dataset_type === "raster") {
      setRowCount(0);
      setFeatureAttributes([]);
      return;
    }
    setIsLoading(true);
    sendWFSRequest({
      version: "2.0.0",
      typeNames: [dataset.layer_id],
      count: paginationModel.pageSize,
      startIndex: paginationModel.pageSize * paginationModel.page,
    }).then(({ data }) => {
      setIsLoading(false);
      setRowCount(data.numberMatched);
      setFeatures(data.features);
      setFeatureAttributes(
        data.features.map((feature) => ({
          ...feature.properties,
          id: feature.id,
        })),
      );
    });
  }, [dataset.layer_id, paginationModel]);
  const selectSingleFeature = useCallback(
    (featureId) => {
      const selectedFeatures = features.filter((f) => f.id === featureId);
      dispatch(setSelectedFeatures(selectedFeatures));
    },
    [features],
  );
  return (
    <Box className="h-full w-full">
      <DataGrid
        loading={isLoading}
        rows={featureAttributes}
        columns={columns}
        paginationMode="server"
        pageSizeOptions={[5, 10, 15]}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        className="border-0 [&_.MuiDataGrid-row]:cursor-pointer"
        onRowClick={(e) => {
          selectSingleFeature(e.id);
        }}
      />
    </Box>
  );
}
