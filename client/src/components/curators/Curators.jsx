import React, { useContext, useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import SelectCustom from "../UI/Curators/SelectCustom";
import { Context } from "../../index";
import CuratorTable12 from "./CuratorsTable1";
import {observer} from "mobx-react-lite";

function Curators() {
  const { store } = useContext(Context);
  // const [flow, setFlow] = React.useState("");
  const [flowData, setFlowData] = useState([]);
  // const [curator, setCurator] = React.useState("");
  const [curatorData, setCuratorData] = React.useState([]);

  useEffect(() => {
    if (!flowData.length) {
      store.getCuratorTableFlows().then((response) => {
        const requiredDataFromResponse = response;
        const data = requiredDataFromResponse.map((eachSensorItem) => ({
          value: eachSensorItem.value,
          text: eachSensorItem.text,
        }));
        // console.log(data);
        setFlowData(data);
      });
    }
    // .catch((error) => {
    //   setFlow1([]);
    //   console.log(error);
    // });
  }, [flowData]);

  useEffect(()=>{
    if(store.flow){
      store.getCuratorTableCurators(store.flow).then((response) => {
        const requiredDataFromResponse = response;
        const data = requiredDataFromResponse.map((eachSensorItem) => ({
          value: eachSensorItem.value,
          text: eachSensorItem.text,
        }));
        console.log(data);
        setCuratorData(data);
      });
  }}, [store.flow]);


  const handleChangeFlow = (event: SelectChangeEvent) => {
    store.setCurator("");
    store.setFlow(event.target.value);
  };


  const handleChangeCurator = (event: SelectChangeEvent) => {
    console.log(event.target)
    store.setCurator(event.target.value);
  };

  return (
    <>
      <div>
        <SelectCustom
          inputLabel="Название потока"
          onChange={handleChangeFlow}
          data={flowData}
          value={store.flow}
        />
      </div>
      {store.flow && (
        <div>
          <SelectCustom
            inputLabel="Выбор таблицы"
            onChange={handleChangeCurator}
            data={curatorData}
            value={store.curator}
          />
        </div>
      )}
      {store.flow && store.curator && <CuratorTable12 />}
    </>
  );
}

// return (
//   <div>
//       <FormControl>
//           <SelectCurator></SelectCurator>
//           <SelectFlow></SelectFlow>
//       </FormControl>
//     <MyModal visible={modal} setVisible={setModal}>
//       <CuratorsTableFormAdd />
//     </MyModal>
//     <button onClick={() => setModal(true)}>Создать таблицу</button>
//     <CuratorsTable />
//   </div>
// );
// }

export default observer(Curators);
