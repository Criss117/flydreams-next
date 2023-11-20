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

export class OracleDb {
  private connection: oracleDB.Connection | null = null;

  constructor() {
    this.getConnection();
  }

  private async getConnection() {
    this.connection = await oracleDB.getConnection({
      user: process.env.NEXT_PUBLIC_USER_DB,
      password: process.env.NEXT_PUBLIC_PASS_DB,
      connectString: process.env.NEXT_PUBLIC_CONNECTION_STRING,
    });
  }

  public async executeProcedure<T>(procedure: string, parameters: T[]) {
    if (!this.connection) {
      return;
    }
    const sql = `BEGIN ${procedure}; END;`;
    const result = await this.connection.execute(sql, parameters);
    await this.close();
    return result;
  }

  private async close() {
    if (!this.connection) {
      return;
    }
    await this.connection.close();
  }
}
