import oracleDB from "oracledb";

export async function getConnection() {
  oracleDB.outFormat = oracleDB.OUT_FORMAT_OBJECT;

  const connection = await oracleDB.getConnection({
    user: process.env.NEXT_PUBLIC_USER_DB,
    password: process.env.NEXT_PUBLIC_PASS_DB,
    connectString: process.env.NEXT_PUBLIC_CONNECTION_STRING,
  });
  return connection;
}

export async function getCursorInfo(cursor: any) {
  //@ts-ignore
  //const resultSet = result.outBinds.cursor;
  let row;
  let response = [];
  while ((row = await cursor.getRow())) {
    response.push(row);
  }

  return response;
}
