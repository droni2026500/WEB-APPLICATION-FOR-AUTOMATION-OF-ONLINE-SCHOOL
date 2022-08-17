import { useTable } from "react-table";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../index";

function SensorTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px red",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: "papayawhip",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function SensorContainer() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { store } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    store
      .getCuratorTable()
      .then((response) => {
        const requiredDataFromResponse = response;
        const data = requiredDataFromResponse.map((eachSensorItem) => ({
          Header: eachSensorItem.Header,
          accessor: eachSensorItem.accessor,
        }));
        setSensors(data);
      })
      .catch((error) => {
        setSensors([]);
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const data = React.useMemo(() => [
    {
      col1: "Hello",
      col2: "pizza",
    },
  ]);

  if (sensors.length === 0 && !loading) {
    return <div>No Senors data available</div>;
  }

  return (
    <div>
      {loading && <span></span>}
      <SensorTable columns={sensors} data={data} />
    </div>
  );
}

export default function CuratorsTable() {
  return <SensorContainer />;
}
