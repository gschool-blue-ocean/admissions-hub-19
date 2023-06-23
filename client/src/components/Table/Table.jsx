import * as React from "react";
import useUserStore from "../../store/userStore";
import url from "../../url";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "full_name",
    headerName: "Student name",
    width: 130,
    valueGetter: (params) => {
      return `${params.row.first_name || ""} ${params.row.last_name || ""}`;
    },
  },
  { field: "start_date", headerName: "Cohort start", width: 100 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    valueGetter: (params) => {
      if (params.value == 1) {
        return "Prep work";
      } else if (params.value == 2) {
        return "Code challenge";
      } else if (params.value == 3) {
        return "Tech interview";
      } else if (params.value == 4) {
        return "Finished";
      }

      return params.value;
    },
  },
  {
    field: "score",
    headerName: "Last score",
    width: 90,
    valueGetter: (params) => {
      if (params.value == null) {
        return "N/A";
      }

      return params.value;
    },
  },
];

export default function Table() {
  const [rows, setRows] = React.useState([]);
  const setStudentId = useUserStore((state) => state.setStudentId);

  React.useEffect(() => {
    fetch(`${url}/students`)
      .then((res) => res.json())
      .then((data) => {
        setRows(data);
      });
  }, []);

  return (
    <div
      style={{
        height: 600,
        width: "100%",
      }}
    >
      <DataGrid
        className="ms-2"
        rows={rows}
        getRowId={(row) => row.student_id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={(params) => {
          console.log(params);
          setStudentId(params.row.student_id);
        }}
      />
    </div>
  );
}
