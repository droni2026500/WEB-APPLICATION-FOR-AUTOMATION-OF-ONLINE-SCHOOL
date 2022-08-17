import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import MyModal from "../UI/MyModal/MyModal";
import ChatBotChannelAdd from "./ChatBotChannelAdd";
import { Context } from "../../index";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  {
    field: "name",
    headerName: "Название канала",
    width: 170,
    editable: false,
    sortable: false,
  },
  {
    field: "channel_id",
    headerName: "ID канала",
    width: 180,
    editable: false,
    sortable: false,
  },
  {
    field: "link",
    headerName: "Ссылка",
    width: 150,
    editable: false,
    sortable: false,
    renderCell: (cellValues) => {
      return <a target="_blank" rel="noopener noreferrer" href={`${cellValues.row.link}`}>Ссылка</a>;
    }
  },
];
const ChatBotsPage = () => {
  const { store } = useContext(Context);
  const [modal, setModal] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    store.getChannels().then((response) => {
      const requiredDataFromResponse = response;
      const data = requiredDataFromResponse.map((eachSensorItem) => ({
        id: eachSensorItem.id,
        name: eachSensorItem.name,
        channel_id: eachSensorItem.channel_id,
        link: eachSensorItem.link,
      }));
      console.log(data);
      setRows(data);
    });
  }, []);
  return (
    <div>
      {/*<div>Чат-бот для сотрудников</div>*/}
      <div>
        <h1>Чат-бот для каналов по городам</h1>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>

      <Button variant="contained" onClick={() => setModal(true)}>
        Добавить канал по городам
      </Button>
      <MyModal visible={modal} setVisible={setModal}>
        <ChatBotChannelAdd />
      </MyModal>
      {/*<div>Чат-бот для учеников</div>*/}
    </div>
  );
};

export default observer(ChatBotsPage);
