import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Feature, GeoJsonProperties } from 'geojson';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';
import { AppDispatch, useDispatch } from '@ncsa/geo-explorer/store';
import {
  SimpleFeature,
  setSelectedFeatures,
} from '@ncsa/geo-explorer/store/explore/slice';
import { Dataset } from '@ncsa/geo-explorer/types';

export type WFSFeatureTableProps = {
  dataset: Dataset;
};

export function WFSFeatureTable({ dataset }: WFSFeatureTableProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { ogcClient } = useContext(GeoExplorerContext);

  const [features, setFeatures] = useState<SimpleFeature[]>([]);
  const [featureAttributes, setFeatureAttributes] = useState<
    GeoJsonProperties[]
  >([]);

  const columns = useMemo<GridColDef[]>(() => {
    const keys = [
      ...new Set(
        featureAttributes.flatMap((attributes) =>
          Object.keys(attributes ?? {}),
        ),
      ),
    ];
    return keys.map((key) => ({
      field: key,
      headerName: key,
      headerClassName: 'bg-[#00000000]',
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
    if (dataset.layer_type === 'raster') {
      setRowCount(0);
      setFeatureAttributes([]);
      return;
    }
    setIsLoading(true);
    ogcClient
      ?.sendWFSRequest<{
        features: SimpleFeature[];
        numberMatched: number;
      }>(dataset.ogc_service_url, {
        version: '2.0.0',
        typeNames: [dataset.layer_id],
        count: paginationModel.pageSize,
        startIndex: paginationModel.pageSize * paginationModel.page,
      })
      .then(({ data }) => {
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
    (featureId: Feature['id']) => {
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
