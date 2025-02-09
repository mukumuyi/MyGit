import React from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function Datagrid(props) {
    const {originData,colSelector}= props
    return (
  <Box sx={{ height: "500pt", width: "100%", background: "white" }}>
    <DataGrid
      rows={originData}
      columns={colSelector.map((item) => {
        return { ...item, field: item.name, headerName: item.name,width:100};
      })}
      headerAlign="center"
      initialState={{
        pagination: {
          paginationModel: {
            // pageSize: 5,
          },
        },
      }}
      // pageSizeOptions={[5]}
      // scrollbar--horizontal
      // scrollbar--vertical
      // checkboxSelection
      // disableRowSelectionOnClick
    />
  </Box>)
}
