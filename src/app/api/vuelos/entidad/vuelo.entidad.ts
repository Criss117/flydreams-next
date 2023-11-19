import oracleDB from "oracledb";
import { getCursorInfo } from "../../repository";

type vuelo = {
  id: number;
  aeropuerto_salida_id: number;
  aeropuerto_llegada_id: number;
  avion_id: number;
  destino: string;
  fecha_salida: string;
  fecha_llegada: string;
  cantidad_pasajeros: number;
};

export class Vuelo {
  private id: number = -1;
  private aeropuerto_salida_id: number = -1;
  private aeropuerto_llegada_id: number = -1;
  private avion_id: number = -1;
  private destino: string = "";
  private fecha_salida: string = "";
  private fecha_llegada: string = "";
  private cantidad_pasajeros: number = -1;

  private connection: oracleDB.Connection | null = null;
  constructor(newConnection: any) {
    this.connection = newConnection;
  }

  public async getAll() {
    if (!this.connection) {
      return;
    }
    const sql = `
      DECLARE
      BEGIN
        vuelo_crud.leer_vuelos(:cursor);
      END;
    `;
    const cursor = { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR };
    const result = await this.connection.execute(sql, { cursor });

    //@ts-ignore
    const response = await getCursorInfo(result.outBinds.cursor);
    await this.connection.close();
    return response;
  }

  public async getInfoToCreate() {
    if (!this.connection) {
      return;
    }
    const sql = `
      DECLARE
      BEGIN
      vuelo_utils.obtener_info_para_crear(:aeropuertos, :aviones);
      END;
    `;

    const aeropuertos = { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR };
    const aviones = { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR };
    const result = await this.connection.execute(sql, { aeropuertos, aviones });

    const response = {};
    //@ts-ignore
    response.aeropuertos = await getCursorInfo(result.outBinds.aeropuertos);
    //@ts-ignore
    response.aviones = await getCursorInfo(result.outBinds.aviones);
    await this.connection.close();
    return response;
  }
}
