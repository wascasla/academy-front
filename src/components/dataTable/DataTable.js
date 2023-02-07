import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const DataTable = ({
  columns,
  rows,
  getRowIdData,
  setPage,
  loading,
  onPagination,
  title,
  checkboxSelection,
  onSelectionModelChange,
  selectionModel,
}) => {
  return (
    // <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
    <>
      <div>{title}</div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          checkboxSelection={checkboxSelection}
          onSelectionModelChange={onSelectionModelChange}
          selectionModel={selectionModel}
          columns={columns}
          pagination
          pageSize={10}
          rows={rows || []}
          getRowId={getRowIdData}
          paginationMode={onPagination ? "server" : ""}
          rowsPerPageOptions={[10]}
          rowCount={rows.length}
          onPageChange={
            onPagination ? (newPage) => setPage(newPage + 1) : () => {}
          }
          loading={loading}
        />
      </div>
    {/* // </Paper> */}
    </>
  );
};

export default DataTable;