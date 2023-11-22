import oracleDB from "oracledb";
import { OracleRepository } from "../../repository";

export type vueloType = {
  vuelo_id?: number;
  aeropuerto_salida_id: number;
  aeropuerto_llegada_id: number;
  avion_id: number;
  destino: string;
  fecha_salida: string;
  fecha_llegada: string;
  cantidad_pasajeros: number;
};

export class Vuelo extends OracleRepository {
  private vuelo_id: number = -1;
  private aeropuerto_salida_id: number = -1;
  private aeropuerto_llegada_id: number = -1;
  private avion_id: number = -1;
  private destino: string = "";
  private fecha_salida: Date = new Date();
  private fecha_llegada: Date = new Date();
  private cantidad_pasajeros: number = 0;

  public getAll() {
    const procedure = "vuelo_crud.leer_vuelos";
    //declarar variable bind
    const vuelos = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.CURSOR,
    };
    const parameters = { vuelos };

    return this.executeProcedure(procedure, parameters);
  }

  public async getInfoToCreate() {
    const procedure = "vuelo_crud.obtener_info_para_crear";

    const aeropuertos = { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR };
    const aviones = { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR };
    const parameters = { aeropuertos, aviones };

    return this.executeProcedure(procedure, parameters);
  }

  public async create(vuelo: vueloType) {
    const procedure = "vuelo_crud.crear_vuelo";
    this.aeropuerto_llegada_id = vuelo.aeropuerto_llegada_id;
    this.aeropuerto_salida_id = vuelo.aeropuerto_salida_id;
    this.avion_id = vuelo.avion_id;
    this.destino = vuelo.destino;
    this.fecha_salida = new Date(vuelo.fecha_salida);
    this.fecha_llegada = new Date(vuelo.fecha_llegada);
    const response = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.DB_TYPE_BOOLEAN,
      bindName: "response",
    };

    const parameters = {
      aeropuerto_llegada_id: this.aeropuerto_llegada_id,
      aeropuerto_salida_id: this.aeropuerto_salida_id,
      avion_id: this.avion_id,
      destino: this.destino,
      fecha_salida: this.fecha_salida,
      fecha_llegada: this.fecha_llegada,
    };

    const result = await this.executeFunction(procedure, parameters, response);
    return result;
  }
}
