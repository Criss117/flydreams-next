import { PersonaType, Personas } from "../../persona/entidad/persona.entidad";
import oracleDB from "oracledb";

export type AzafataType = {
  azafata_id?: number;
  vuelos_abordados: number;
  idioma_natal: string;
  idioma_secundario: string;
};

export class Azafata extends Personas {
  private azafata_id: number = -1;
  private vuelos_abordados: number = -1;
  private idioma_natal: string = "";
  private idioma_secundario: string = "";

  public async createAzafata(
    persona_info: PersonaType,
    azafata_info: AzafataType
  ) {
    this.vuelos_abordados = azafata_info.vuelos_abordados;
    this.idioma_natal = azafata_info.idioma_natal;
    this.idioma_secundario = azafata_info.idioma_secundario;

    const procedure = "azafata_crud.crear_azafata";
    const azafata = await this.getRowBindIn("AZAFATA_CRUD.AZAFATA_TYPE", {
      VUELOS_ABORDADOS: this.vuelos_abordados,
      IDIOMA_NATAL: this.idioma_natal,
      IDIOMA_SECUNDARIO: this.idioma_secundario,
    });

    return this.executePersonPackage(persona_info, procedure, { azafata });
  }

  public async update(persona_info: PersonaType, azafata_info: AzafataType) {
    this.azafata_id = azafata_info.azafata_id || this.azafata_id;
    this.vuelos_abordados = azafata_info.vuelos_abordados;
    this.idioma_natal = azafata_info.idioma_natal;
    this.idioma_secundario = azafata_info.idioma_secundario;

    const procedure = "azafata_crud.actualizar_azafata";
    const azafata = await this.getRowBindIn("AZAFATA_CRUD.AZAFATA_TYPE", {
      AZAFATA_ID: this.azafata_id,
      VUELOS_ABORDADOS: this.vuelos_abordados,
      IDIOMA_NATAL: this.idioma_natal,
      IDIOMA_SECUNDARIO: this.idioma_secundario,
    });

    return this.executePersonPackage(persona_info, procedure, { azafata });
  }

  public async getOne(id: number) {
    this.azafata_id = id;
    const procedure = "azafata_crud.leer_azafata";
    const azafata = await this.getRowBindOut("AZAFATA_CRUD.AZAFATA_TYPE");
    const persona = await this.getRowBindOut("PERSONA_CRUD.PERSONA_TYPE");

    const parameters = { azafata_id: this.azafata_id, azafata, persona };
    const result = await this.executeProcedure(procedure, parameters);
    return result;
  }

  public async getAll(pagina_actual: number) {
    const procedure = "azafata_crud.leer_azafatas";
    const azafatas = {
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

    const parameters = { azafatas, p_tamanio_pagina, p_pagina_actual };
    return await this.executeProcedure(procedure, parameters);
  }

  public async getByVuelo(vueloId: number) {
    const procedure = "azafata_crud.leer_azafatas_por_vuelo";
    const azafatas = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.CURSOR,
    };
    const vuelo_id = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: vueloId,
    };
    const parameters = { vuelo_id, azafatas };
    return this.executeProcedure(procedure, parameters);
  }

  public async delete(id: number) {
    this.azafata_id = id;
    const procedure = "azafata_crud.eliminar_azafata";
    const azafata_id = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: this.azafata_id,
    };
    const response = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.DB_TYPE_BOOLEAN,
      bindName: "response",
    };
    const parameters = { azafata_id };
    const result = await this.executeFunction(procedure, parameters, response);
    return result;
  }

  public async deleteFromVuelo(vueloId: number, azafataId: number) {
    const procedure = "azafata_crud.eliminar_se_asigna";
    const azafata_id = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: azafataId,
    };
    const vuelo_id = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: vueloId,
    };
    const response = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.DB_TYPE_BOOLEAN,
      bindName: "response",
    };
    const parameters = { vuelo_id, azafata_id };
    const result = await this.executeFunction(procedure, parameters, response);
    return result;
  }

  public async assignStewardess(vueloId: number, azafataId: number) {
    const procedure = "azafata_crud.asignar_azafata";
    const azafata_id = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: azafataId,
    };
    const vuelo_id = {
      dir: oracleDB.BIND_IN,
      type: oracleDB.NUMBER,
      val: vueloId,
    };
    const response = {
      dir: oracleDB.BIND_OUT,
      type: oracleDB.DB_TYPE_BOOLEAN,
      bindName: "response",
    };
    const parameters = { vuelo_id, azafata_id };
    const result = await this.executeFunction(procedure, parameters, response);
    return result;
  }

  // private async getAzafataBindOut() {
  //   const AzafataRowTypeClass = await this.getRowType(
  //     "AZAFATA_CRUD.AZAFATA_TYPE"
  //   );
  //   return {
  //     dir: oracleDB.BIND_OUT,
  //     type: AzafataRowTypeClass,
  //   };
  // }
  // private async getAzafataBindIn(parameters: {}) {
  //   const AzafataRowTypeClass = await this.getRowType(
  //     "AZAFATA_CRUD.AZAFATA_TYPE"
  //   );
  //   const obj = new AzafataRowTypeClass(parameters);
  //   return obj;
  // }
}
