import { Personas } from "@/app/api/persona/entidad/persona.entidad";
import oracleDB from "oracledb";

export type PilotoType = {
  piloto_id?: number;
  licencia_id: number;
  vuelos: number;
  emision_licencia: string;
  vencimiento_licencia: string;
};

export class Piloto extends Personas {
  private piloto_id: number = -1;
  private licencia_id: number = -1;
  private vuelos: number = -1;
  private emision_licencia: string = "";
  private vencimiento_licencia: string = "";

  public async getOne(id: number) {
    this.piloto_id = id;
    const procedure = "piloto_crud.leer_piloto";
    const piloto = await this.getRowBindOut("PILOTO_CRUD.PILOTO_TYPE");
    const persona = await this.getRowBindOut("PERSONA_CRUD.PERSONA_TYPE");

    const parameters = { piloto_id: this.piloto_id, piloto, persona };
    const result = await this.executeProcedure(procedure, parameters);
    return result;
  }

  public async getAll(pagina_actual: number) {
    const procedure = "piloto_crud.leer_pilotos";
    const pilotos = {
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

    const parameters = { pilotos, p_tamanio_pagina, p_pagina_actual };
    return await this.executeProcedure(procedure, parameters);
  }
}
