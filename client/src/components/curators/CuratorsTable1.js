import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import { toJS } from "mobx";

const getRenderCell = ({ field, value }) => {
  if (field === "col4") {
    return (
      <a target="_blank" rel="noopener noreferrer" href={value}>
        Профиль
      </a>
    );
  }
};

const CuratorTable1 = ({ rows, columns }) => {
  return (
    <div style={{ height: 580, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

const CuratorTableData = () => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const { store } = useContext(Context);

  useEffect(() => {
    store
      .getCuratorTable(store.flow, store.curator)
      .then((response) => {
        const requiredDataFromResponse = response;
        const columns_data = requiredDataFromResponse[0].map(
          (eachSensorItem) => ({
            headerName: eachSensorItem.header,
            field: eachSensorItem.accessor,
            width: eachSensorItem.width,
            renderCell: getRenderCell,
          })
        );
        console.log(columns_data);
        const rows_data = requiredDataFromResponse[1].map((eachSensorItem) => ({
          id: eachSensorItem.col3,
          col1: eachSensorItem.col1,
          col2: eachSensorItem.col2,
          col3: eachSensorItem.col3,
          col4: eachSensorItem.col4,
          col5: eachSensorItem.col5,
          col6: eachSensorItem.col6,
          col7: eachSensorItem.col7,
          col8: eachSensorItem.col8,
          col9: eachSensorItem.col9,
          col10: eachSensorItem.col10,
        }));
        console.log(rows_data);
        setColumns(columns_data);
        setRows(rows_data);
      })
      .catch((error) => {
        console.log(error);
        setColumns([]);
        setRows([]);
      });
  }, []);

  return (
    <div>
      <CuratorTable1 rows={rows} columns={columns} />
    </div>
  );
};

export default function CuratorTable12() {
  return <CuratorTableData />;
}
