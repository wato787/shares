import type { GridEventListener } from '@mui/x-data-grid';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid/DataGrid';
import type { GridColDef } from '@mui/x-data-grid/models/colDef';
import type { ReactElement } from 'react';

interface Props {
  loading?: boolean | undefined;
  columns: GridColDef[];
  rows: readonly any[];
  onRowClick?: GridEventListener<'rowClick'>;
  pagination?: boolean;
  itemsPerPage?: number;
}

const DataGrid = (props: Props): ReactElement => {
  return (
    <MuiDataGrid
      autoHeight
      columnHeaderHeight={40}
      columns={props.columns}
      loading={props.loading}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 12 },
        },
      }}
      onRowClick={props.onRowClick}
      rows={props.rows}
      sx={{
        borderLeft: 'none',
        borderRight: 'none',
        borderRadius: 0,
        '& .MuiDataGrid-row:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        '& .MuiDataGrid-row.Mui-selected': {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        '& .MuiDataGrid-row.Mui-selected:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        '& .MuiDataGrid-columnHeaders': {
          margin: 0,
        },
        '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
          outline: 'none',
        },
        '& .MuiDataGrid-cell:focus-within': {
          outline: 'none',
        },
      }}
    />
  );
};

export default DataGrid;
