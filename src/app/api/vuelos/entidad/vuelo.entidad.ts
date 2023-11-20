import oracleDB from "oracledb";
import { getCursorInfo } from "../../repository";
import { VueloFront } from "@/utilities";

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
  private fecha_salida: Date = new Date();
  private fecha_llegada: Date = new Date();

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

  public async create(data: VueloFront) {
    if (!this.connection) {
      return;
    }
    console.log(data);
    this.aeropuerto_salida_id = data.aeroSalidaId;
    this.aeropuerto_llegada_id = data.aeroLlegadaId;
    this.avion_id = data.avionId;
    this.destino = data.destino;
    this.fecha_salida = new Date(data.fechaSalida);
    this.fecha_llegada = new Date(data.fechaLlegada);

    const sql = `
      DECLARE
      BEGIN
        vuelo_crud.crear_vuelo(
          :aeropuerto_salida_id, 
          :aeropuerto_llegada_id, 
          :avion_id,
          :destino, 
          :fecha_salida, 
          :fecha_llegada
        ); 
      END;
    `;

    try {
      const response = await this.connection.execute(sql, {
        aeropuerto_salida_id: this.aeropuerto_salida_id,
        aeropuerto_llegada_id: this.aeropuerto_llegada_id,
        avion_id: this.avion_id,
        destino: this.destino,
        fecha_llegada: this.fecha_llegada,
        fecha_salida: this.fecha_salida,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
