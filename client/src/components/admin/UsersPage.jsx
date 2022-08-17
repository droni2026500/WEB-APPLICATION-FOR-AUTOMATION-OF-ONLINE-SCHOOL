import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Context } from "../../index";
import MyModal from "../UI/MyModal/MyModal";
import UsersAdd from "./UsersAdd";
import {makeStyles} from "@material-ui/core/styles";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  {
    field: "full_name",
    headerName: "Полное имя",
    width: 170,
    editable: false,
    sortable: false,
  },
  {
    field: "email",
    headerName: "Почта",
    width: 180,
    editable: false,
    sortable: false,
  },
  {
    field: "role",
    headerName: "Роль",
    width: 150,
    editable: false,
    sortable: false,
  },
];

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    gap: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "16px 16px 0"
  },
  buttonsWrapper: {
    display: "flex",
    gap: 10,
    justifyContent: "flex-start"
  }
}));

const UsersPage = () => {
  const { store } = useContext(Context);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [rows, setRows] = useState([]);
  const [modal, setModal] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      await store.getUsers();
    })()
    const data = createRows(store.Users);
    setRows(data);
  }, []);

  function createRows(data) {
    return data.map((eachSensorItem) => ({
      id: eachSensorItem.id,
      full_name: eachSensorItem.full_name,
      email: eachSensorItem.email,
      role: eachSensorItem.role,
    }));
  }

  useEffect(() => {
    const data = createRows(store.Users);
    setRows(data)
  }, [store.Users])

  const handleRowClick = (ids) => {
    const selectedIDs = new Set(ids);
    console.log(selectedIDs);
    const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
    setSelectedRows(selectedRows);
    console.log(selectedRows);
  };


  const deleteUsers = () => {
    store.deleteUsers(selectedRows).then((response) => {
      if (response === "User delete") {
        window.location.reload();
      }
    });
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={handleRowClick}
      />
      <div className={classes.container}>
        <div className={classes.buttonsWrapper}>
          <Button variant="contained" onClick={() => setModal(true)}>
            Добавить
          </Button>
          {selectedRows.length === 1 && (
              <Button variant="contained">Изменить</Button>
          )}
        </div>
        {selectedRows.length > 0 && (
            <Button
                variant="contained"
                onClick={deleteUsers}
            >
              Удалить
            </Button>
        )}

      </div>
      <MyModal visible={modal} setVisible={setModal}>
        <UsersAdd setModal={setModal} />
      </MyModal>
    </div>
  );
};
export default observer(UsersPage);
