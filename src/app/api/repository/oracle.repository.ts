import oracleDB from "oracledb";

export type OracleType = {
  type: number | any;
  dir: number;
  bindName?: string;
  val?: any;
};
export type Parameters = {
  [key: string]: OracleType | any;
};

export class OracleRepository {
  private connection: oracleDB.Connection | null = null;

  public async executeProcedure(procedure: string, parameters: Parameters) {
    const bindNames = Object.keys(parameters);

    const query = `
    DECLARE 
    BEGIN ${procedure}(${bindNames.map((bindName) => {
      return `:${bindName}`;
    })}); END;`;

    try {
      const result = await this.executeQuery(query, parameters);
      const response = {};
      for (const bindName of bindNames) {
        if (parameters[bindName].type === oracleDB.CURSOR) {
          //@ts-ignore
          response[bindName] = await this.readCursor(result.outBinds[bindName]);
        }

        if (typeof parameters[bindName].type === "function") {
          //@ts-ignore
          response[bindName] = result.outBinds[bindName];
        }
      }
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  public async executeFunction(
    functionName: string,
    parameters: Parameters,
    response: OracleType
  ) {
    const bindNames = Object.keys(parameters);

    const query = `
    DECLARE 
    BEGIN 
      :${response.bindName} := ${functionName}(${bindNames.map((bindName) => {
      return `:${bindName}`;
    })}); END;`;

    try {
      const result = await this.executeQuery(query, {
        ...parameters,
        response,
      });
      //@ts-ignore
      return result.outBinds;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  private async executeQuery(query: string, parameters: Parameters) {
    if (!this.connection) {
      this.connection = await this.getConnection();
    }
    const result = await this.connection.execute(query, parameters);
    return result;
  }

  public async getRowType(type: string) {
    if (!this.connection) {
      this.connection = await this.getConnection();
    }
    const rowType = await this.connection.getDbObjectClass(type);
    return rowType;
  }

  private async getConnection() {
    oracleDB.outFormat = oracleDB.OUT_FORMAT_OBJECT;
    return await oracleDB.getConnection({
      user: process.env.NEXT_PUBLIC_USER_DB,
      password: process.env.NEXT_PUBLIC_PASS_DB,
      connectString: process.env.NEXT_PUBLIC_CONNECTION_STRING,
    });
  }

  private async close() {
    if (!this.connection) {
      return;
    }
    await this.connection.close();
  }

  private async readCursor(cursor: any) {
    //@ts-ignore
    let row;
    let response = [];
    while ((row = await cursor.getRow())) {
      response.push(row);
    }

    return response;
  }
}
