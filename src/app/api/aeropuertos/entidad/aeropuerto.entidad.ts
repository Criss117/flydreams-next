import oracleDB, { CURSOR } from "oracledb";
import { getCursorInfo } from "../../repository";

export type aeropuerto = {
  id?: number;
  nombre: string;
  ciudad: string;
  pais: string;
};

export class Aeropuerto {
  private id: number = -1;
  private nombre: string = "";
  private ciudad: string = "";
  private pais: string = "";
  private connection: oracleDB.Connection | null = null;
  constructor(newConnection: oracleDB.Connection) {
    this.connection = newConnection;
  }

  public async create(aeropuerto: aeropuerto) {
    this.nombre = aeropuerto.nombre;
    this.ciudad = aeropuerto.ciudad;
    this.pais = aeropuerto.pais;

    if (!this.connection) {
      return;
    }
    const sql = `
      DECLARE
      BEGIN
        aeropuerto_crud.crear_aeropuerto(:nombre, :pais, :ciudad);
      END;
    `;

    try {
      const response = await this.connection.execute(sql, {
        nombre: this.nombre,
        pais: this.pais,
        ciudad: this.ciudad,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async getAll() {
    if (!this.connection) {
      return;
    }
    const sql = `
      DECLARE
      BEGIN
        aeropuerto_crud.leer_aeropuertos(:cursor);
      END;
    `;
    const cursor = { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR };
    const result = await this.connection.execute(sql, { cursor });

    //@ts-ignore
    const response = await getCursorInfo(result.outBinds.cursor);
    await this.connection.close();
    return response;
  }

  public async getInfo(aeropuerto_id: number) {
    this.id = aeropuerto_id;
    if (!this.connection) {
      return;
    }
    const RowTypeClass = await this.connection.getDbObjectClass(
      "AEROPUERTO_UTILS.AEROPUERTO_TYPE"
    );
    const sql = `
      DECLARE 
      BEGIN
        aeropuerto_utils.obtener_info(${this.id}, :infoBind, :llegadaCursor, :salidaCursor);
      END;
    `;

    const infoBind = { dir: oracleDB.BIND_OUT, type: RowTypeClass };
    const llegadaCursor = { dir: oracleDB.BIND_OUT, type: CURSOR };
    const salidaCursor = { dir: oracleDB.BIND_OUT, type: CURSOR };

    try {
      const response = await this.connection.execute(sql, {
        //@ts-ignore
        infoBind,
        llegadaCursor,
        salidaCursor,
      });

      const vuelosLLegada = await getCursorInfo(
        //@ts-ignore
        response.outBinds.llegadaCursor
      );
      const vuelosSalida = await getCursorInfo(
        //@ts-ignore
        response.outBinds.salidaCursor
      );

      await this.connection.close();
      return {
        //@ts-ignore
        aeropuerto: response.outBinds.infoBind,
        llegada: vuelosLLegada,
        salida: vuelosSalida,
      };
    } catch (error) {
      await this.connection.close();
      return error;
    }
  }

  public async getOne(aeropuerto_id: number) {
    this.id = aeropuerto_id;
    if (!this.connection) {
      return;
    }
  }

  public async update(aeropuerto_id: number, aeropuerto: aeropuerto) {
    this.id = aeropuerto_id;
    this.nombre = aeropuerto.nombre;
    this.ciudad = aeropuerto.ciudad;
    this.pais = aeropuerto.pais;
    if (!this.connection) {
      return;
    }
    const sql = `
      DECLARE 
      BEGIN
        aeropuerto_crud.actualizar_aeropuerto(:aeropuerto_id, :nombre, :pais, :ciudad);
      END;
    `;

    try {
      const response = await this.connection.execute(sql, {
        aeropuerto_id: this.id,
        nombre: this.nombre,
        pais: this.pais,
        ciudad: this.ciudad,
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async delete(aeropuerto_id: number) {
    this.id = aeropuerto_id;
    if (!this.connection) {
      return;
    }
    const sql = `
      DECLARE 
      BEGIN
        aeropuerto_crud.eliminar_aeropuerto(${this.id});
      END;
    `;

    try {
      const response = await this.connection.execute(sql);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
