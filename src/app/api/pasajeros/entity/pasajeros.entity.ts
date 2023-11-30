import { PersonaType, Personas } from "../../persona/entidad/persona.entidad";
import oracleDB from "oracledb";

export type PasajeroType = {
  pasajero_id?: number;
  companion_id?: number;
  costo: number;
  destino: string;
  peso: number;
};

export class Pasajero extends Personas {
  private pasajero_id: number = -1;
  private companion_id: number | undefined = -1;
  private costo: number = -1;
  private destino: string = "";
  private peso: number = -1;

  public async createPasajero(
    persona_info: PersonaType,
    pasajero_info: PasajeroType
  ) {
    this.companion_id = pasajero_info.companion_id;
    this.costo = pasajero_info.costo;
    this.destino = pasajero_info.destino;
    this.peso = pasajero_info.peso;

    const procedure = "pasajero_crud.crear_pasajero";
    const pasajero = await this.getRowBindIn("PASAJERO_CRUD.PASAJERO_TYPE", {
      COMPANION_ID: this.companion_id,
      COSTO: this.costo,
      DESTINO: this.destino,
      PESO: this.peso,
    });

    const response = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.NUMBER,
      bindName: "response",
    };

    return this.executePersonPackage(
      persona_info,
      procedure,
      { pasajero },
      response
    );
  }

  public async asignarVuelo(vuelo_id: number, pasajero_id: number) {
    this.pasajero_id = pasajero_id;

    const procedure = "pasajero_crud.asignar_vuelo";

    const p_vuelo_id = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: vuelo_id,
    };
    const p_pasajero_id = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: pasajero_id,
    };
    const response = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.DB_TYPE_BOOLEAN,
      bindName: "response",
    };
    const parameters = { p_pasajero_id, p_vuelo_id };
    return this.executeFunction(procedure, parameters, response);
  }

  public async getOne(pasajero_id: number) {
    this.pasajero_id = pasajero_id;
    const procedure = "pasajero_crud.leer_pasajero";
    const pasajero = await this.getRowBindOut("PASAJERO_CRUD.PASAJERO_TYPE");
    const persona = await this.getRowBindOut("PERSONA_CRUD.PERSONA_TYPE");
    const parameters = { pasajero_id: this.pasajero_id, pasajero, persona };
    return await this.executeProcedure(procedure, parameters);
  }
}
