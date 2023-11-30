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

  public getAll(pagina_actual: number) {
    const procedure = "vuelo_crud.leer_vuelos";
    const vuelos = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.CURSOR,
    };
    const p_tamanio_pagina = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: 10,
    };
    const p_pagina_actual = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: pagina_actual,
    };

    const parameters = { vuelos, p_tamanio_pagina, p_pagina_actual };

    return this.executeProcedure(procedure, parameters);
  }

  public async getOne(id: number) {
    this.vuelo_id = id;
    const VueloRowTypeClass = await this.getRowType("VUELO_CRUD.VUELO_TYPE");
    const procedure = "vuelo_crud.leer_vuelo";
    const vuelo = {
      dir: oracleDB.BIND_OUT,
      type: VueloRowTypeClass,
    };

    const parameters = { vuelo_id: this.vuelo_id, vuelo };
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
      type: oracleDB.NUMBER,
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

  public async delete(id: number) {
    this.avion_id = id;
    const procedure = "vuelo_crud.eliminar_vuelo";
    const vuelo_id = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: this.avion_id,
    };
    const response = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.DB_TYPE_BOOLEAN,
      bindName: "response",
    };
    const parameters = { vuelo_id };
    const result = await this.executeFunction(procedure, parameters, response);
    return result;
  }

  public async update(id: number, vueloInfo: vueloType) {
    this.vuelo_id = id;
    this.aeropuerto_llegada_id = vueloInfo.aeropuerto_llegada_id;
    this.aeropuerto_salida_id = vueloInfo.aeropuerto_salida_id;
    this.avion_id = vueloInfo.avion_id;
    this.destino = vueloInfo.destino;
    this.fecha_salida = new Date(vueloInfo.fecha_salida);
    this.fecha_llegada = new Date(vueloInfo.fecha_llegada);
    const VueloRowTypeClass = await this.getRowType("VUELO_CRUD.VUELO_TYPE");

    const procedure = "vuelo_crud.actualizar_vuelo";
    const vuelo_info = new VueloRowTypeClass({
      AEROPUERTO_LLEGADA_ID: this.aeropuerto_llegada_id,
      AEROPUERTO_SALIDA_ID: this.aeropuerto_salida_id,
      AVION_ID: this.avion_id,
      DESTINO: this.destino,
      FECHA_SALIDA: this.fecha_salida,
      FECHA_LLEGADA: this.fecha_llegada,
    });
    const vuelo_id = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: this.avion_id,
    };
    const parameters = {
      vuelo_id,
      vuelo_info,
    };
    const response = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.DB_TYPE_BOOLEAN,
      bindName: "response",
    };

    const result = await this.executeFunction(procedure, parameters, response);
    return result;
  }
}
