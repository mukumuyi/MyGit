import React, { useState, useEffect } from "react";
import GenerateColorRange from "./GenerateColorRange"
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

function Trial() {
  const [sql, setSql] = useState("SELECT id, name FROM public.users");
  const [tasks, setTasks] = useState([]);
  const colorList = [1, 2, 3, 5, 11, 6, 7, 8];
  const item = { id: 1, name: "Wait", value: "#c7cacc", label: "Wait" };

  // function generateColorRange(start, end, count) {
  //   const rStart = parseInt(start.substr(1, 2), 16);
  //   const gStart = parseInt(start.substr(3, 2), 16);
  //   const bStart = parseInt(start.substr(5, 2), 16);
  //   const rEnd = parseInt(end.substr(1, 2), 16);
  //   const gEnd = parseInt(end.substr(3, 2), 16);
  //   const bEnd = parseInt(end.substr(5, 2), 16);
  //   const rInterval = (rEnd - rStart) / count;
  //   const gInterval = (gEnd - gStart) / count;
  //   const bInterval = (bEnd - bStart) / count;

  //   // console.log(rStart,",",gStart,",",bStart)
  //   // console.log(rEnd,",",gEnd,",",bEnd)
  //   // console.log(rInterval,",",gInterval,",",bInterval)

  //   const colorList = Array.from({ length: count }, (v, i) => {
  //     const result = []
  //     const rNum =
  //       "00" + (rStart + Math.ceil(i * rInterval)).toString(16).toUpperCase();
  //     const gNum =
  //       "00" + (gStart + Math.ceil(i * gInterval)).toString(16).toUpperCase();
  //     const bNum =
  //       "00" + (bStart + Math.ceil(i * bInterval)).toString(16).toUpperCase();
  //     // console.log("#" + rNum.substring(rNum.length - 2) + gNum.substring(gNum.length - 2) + bNum.substring(bNum.length - 2))
  //     result.id=i
  //     result.color=  "#" +
  //     rNum.substring(rNum.length - 2) +
  //     gNum.substring(gNum.length - 2) +
  //     bNum.substring(bNum.length - 2)
  //     return (
  //       result
  //     );
  //   });

  //   return colorList;
  // }

  const TEST = GenerateColorRange("#FF0000", "#0000FF", 30);
  // console.log(TEST);

  const onExecClick = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    setSql(e.target[0].value);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width:"500"},
    {
      field: 'firstName',
      headerName: 'firstName',
    },
    {
      field: 'lastName',
      headerName: 'Last name',
    },
    {
      field: 'age',
      headerName: 'Age',
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (
    <>
      <h1>ここは試し用のページです</h1>
      <div>
            <Box sx={{ height: 350, width: "100%" ,background: "white" }}>
              <DataGrid
                rows={rows  }
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                // checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </div>

      <Card />
      {/* <ColorPalette item={item}/> */}
      <p>色設定</p>
      <div style={{display:"inline-flex",}}>
      {TEST.map((item) => (
        <p style={{ background: item.color }}>{item.id} ,</p>
      ))}
      </div>
      
      {/* <Button variant="contained">Hello world</Button> */}
      <p>SQL結果は以下に</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} (色: {task.color})
          </li>
        ))}
      </ul>
      <br />
    </>
  );
}

export default Trial;
