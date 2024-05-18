import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function Datagrid(props) {
    const {originData,colSelector}= props
    return (
  <Box sx={{ height: 350, width: "100%", background: "white" }}>
    <DataGrid
      rows={originData.slice(0, 5)}
      columns={colSelector.map((item) => {
        return { ...item, field: item.name, headerName: item.name };
      })}
      headerAlign="center"
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      // checkboxSelection
      // disableRowSelectionOnClick
    />
  </Box>)
}
