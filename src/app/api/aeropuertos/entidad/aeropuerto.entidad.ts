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
    const llegadaCursor = { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR };
    const salidaCursor = { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR };

    const parameters = {
      aeropuerto_id,
      aeropuerto,
      llegadaCursor,
      salidaCursor,
    };
    return this.executeProcedure(procedure, parameters);
  }

  // public async create(aeropuerto: aeropuerto) {
  //   this.nombre = aeropuerto.nombre;
  //   this.ciudad = aeropuerto.ciudad;
  //   this.pais = aeropuerto.pais;

  //   if (!this.connection) {
  //     return;
  //   }
  //   const sql = `
  //     DECLARE
  //     BEGIN
  //       aeropuerto_crud.crear_aeropuerto(:nombre, :pais, :ciudad);
  //     END;
  //   `;

  //   try {
  //     const response = await this.connection.execute(sql, {
  //       nombre: this.nombre,
  //       pais: this.pais,
  //       ciudad: this.ciudad,
  //     });
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  //

  // public async getOne(aeropuerto_id: number) {
  //   this.id = aeropuerto_id;
  //   if (!this.connection) {
  //     return;
  //   }
  // }

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

  // public async delete(aeropuerto_id: number) {
  //   this.id = aeropuerto_id;
  //   if (!this.connection) {
  //     return;
  //   }
  //   const sql = `
  //     DECLARE
  //     BEGIN
  //       aeropuerto_crud.eliminar_aeropuerto(${this.id});
  //     END;
  //   `;

  //   try {
  //     const response = await this.connection.execute(sql);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // }
}
