import { OracleRepository } from "../../repository";
import oracleDB from "oracledb";

export type PersonaType = {
  persona_id?: number;
  genero_id: number;
  numero_identificacion: number;
  nombre: string;
  apellido: string;
  fecha_nac: string;
  pais_nac: string;
  ciudad_nac: string;
};

export class Personas extends OracleRepository {
  private persona_id: number = -1;
  private genero_id: number = -1;
  private numero_identificacion: number = -1;
  private nombre: string = "";
  private apellido: string = "";
  private fecha_nac: Date = new Date();
  private pais_nac: string = "";
  private ciudad_nac: string = "";

  public async executePersonPackage(
    persona_info: PersonaType,
    procedure: string,
    parameters: any,
    response: {
      dir: number;
      type: number;
      bindName: string;
    }
  ) {
    this.persona_id = persona_info.persona_id || this.persona_id;
    this.genero_id = persona_info.genero_id;
    this.numero_identificacion = persona_info.numero_identificacion;
    this.nombre = persona_info.nombre;
    this.apellido = persona_info.apellido;
    this.fecha_nac = new Date(persona_info.fecha_nac);
    this.pais_nac = persona_info.pais_nac;
    this.ciudad_nac = persona_info.ciudad_nac;

    const persona = await this.getRowBindIn("PERSONA_CRUD.PERSONA_TYPE", {
      PERSONA_ID: this.persona_id,
      GENERO_ID: this.genero_id,
      NUMERO_IDENTIFICACION: this.numero_identificacion,
      NOMBRE: this.nombre,
      APELLIDO: this.apellido,
      FECHA_NAC: this.fecha_nac,
      PAIS_NAC: this.pais_nac,
      CIUDAD_NAC: this.ciudad_nac,
    });
    const newParameters = { persona, ...parameters };

    const result = await this.executeFunction(
      procedure,
      newParameters,
      response
    );
    return result;
  }
}
