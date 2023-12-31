import oracleDB from "oracledb";
import { OracleRepository } from "../../repository";

export type aeropuerto = {
  aeropueto_id?: number;
  nombre: string;
  ciudad: string;
  pais: string;
};

export class Aeropuerto extends OracleRepository {
  private aeropuerto_id: number = -1;
  private nombre: string = "";
  private ciudad: string = "";
  private pais: string = "";

  public async getAll() {
    const procedure = "aeropuerto_crud.leer_aeropuertos";
    const aeropuertos = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.CURSOR,
    };
    const parameters = { aeropuertos };

    return this.executeProcedure(procedure, parameters);
  }

  public async getInfo(id: number) {
    this.aeropuerto_id = id;
    const AeropuertoRowTypeClass = await this.getRowType(
      "AEROPUERTO_CRUD.AEROPUERTO_TYPE"
    );
    const procedure = "aeropuerto_crud.obtener_info";

    const aeropuerto_id = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: this.aeropuerto_id,
    };
    const aeropuerto = { dir: oracleDB.BIND_OUT, type: AeropuertoRowTypeClass };
    const llegada = { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR };
    const salida = { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR };

    const parameters = {
      aeropuerto_id,
      aeropuerto,
      llegada,
      salida,
    };
    return this.executeProcedure(procedure, parameters);
  }

  public async create(aeropuerto: aeropuerto) {
    this.nombre = aeropuerto.nombre;
    this.ciudad = aeropuerto.ciudad;
    this.pais = aeropuerto.pais;

    const procedure = "aeropuerto_crud.crear_aeropuerto";
    const response = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.DB_TYPE_BOOLEAN,
      bindName: "response",
    };
    const parameters = {
      nombre: this.nombre,
      ciudad: this.ciudad,
      pais: this.pais,
    };
    const result = await this.executeFunction(procedure, parameters, response);
    return result;
  }

  public async delete(id: number) {
    this.aeropuerto_id = id;
    const procedure = "aeropuerto_crud.eliminar_aeropuerto";
    const aeropuerto_id = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: this.aeropuerto_id,
    };
    const response = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.DB_TYPE_BOOLEAN,
      bindName: "response",
    };
    const parameters = { aeropuerto_id };
    const result = await this.executeFunction(procedure, parameters, response);
    return result;
  }

  public async update(id: number, aeropuerto: aeropuerto) {
    this.aeropuerto_id = id;
    this.nombre = aeropuerto.nombre;
    this.ciudad = aeropuerto.ciudad;
    this.pais = aeropuerto.pais;
    const AeroRowTypeClass = await this.getRowType(
      "AEROPUERTO_CRUD.AEROPUERTO_TYPE"
    );

    const procedure = "aeropuerto_crud.actualizar_aeropuerto";
    const aero_info = new AeroRowTypeClass({
      NOMBRE: this.nombre,
      CIUDAD: this.ciudad,
      PAIS: this.pais,
    });
    const aeropuerto_id = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: this.aeropuerto_id,
    };
    const parameters = {
      aeropuerto_id,
      aero_info,
    };
    const response = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.DB_TYPE_BOOLEAN,
      bindName: "response",
    };
    const result = await this.executeFunction(procedure, parameters, response);
    return result;
  }
  public async getOne(aeropuerto_id: number) {
    const AeropuertoRowTypeClass = await this.getRowType(
      "AEROPUERTO_CRUD.AEROPUERTO_TYPE"
    );
    const procedure = "aeropuerto_crud.leer_aeropuerto";
    this.aeropuerto_id = aeropuerto_id;
    const aeropuerto = {
      dir: oracleDB.BIND_OUT,
      type: AeropuertoRowTypeClass,
    };
    const parameters = {
      aeropuerto_id: this.aeropuerto_id,
      aeropuerto,
    };
    return this.executeProcedure(procedure, parameters);
  }

  // public async update(aeropuerto_id: number, aeropuerto: aeropuerto) {
  //   this.id = aeropuerto_id;
  //   this.nombre = aeropuerto.nombre;
  //   this.ciudad = aeropuerto.ciudad;
  //   this.pais = aeropuerto.pais;
  //   if (!this.connection) {
  //     return;
  //   }
  //   const sql = `
  //     DECLARE
  //     BEGIN
  //       aeropuerto_crud.actualizar_aeropuerto(:aeropuerto_id, :nombre, :pais, :ciudad);
  //     END;
  //   `;

  //   try {
  //     const response = await this.connection.execute(sql, {
  //       aeropuerto_id: this.id,
  //       nombre: this.nombre,
  //       pais: this.pais,
  //       ciudad: this.ciudad,
  //     });
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // }
}
