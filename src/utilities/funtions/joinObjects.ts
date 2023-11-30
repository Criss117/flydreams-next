import { getDate } from "./formatDate";
export function joinObjects(obj1: {}, obj2: {}) {
  console.log(obj1);
  return { ...obj1, ...obj2 };
}

export function mayusToMinusAzafata(obj: any) {
  return {
    azafata: {
      persona_id: obj.azafata.PERSONA_ID,
      azafata_id: obj.azafata.AZAFATA_ID,
      vuelos_abordados: obj.azafata.VUELOS_ABORDADOS,
      idioma_natal: obj.azafata.IDIOMA_NATAL,
      idioma_secundario: obj.azafata.IDIOMA_SECUNDARIO,
    },
    persona: {
      persona_id: obj.persona.PERSONA_ID,
      genero_id: obj.persona.GENERO_ID,
      numero_identificacion: obj.persona.NUMERO_IDENTIFICACION,
      nombre: obj.persona.NOMBRE,
      apellido: obj.persona.APELLIDO,
      fecha_nac: getDate(obj.persona.FECHA_NAC),
      pais_nac: obj.persona.PAIS_NAC,
      ciudad_nac: obj.persona.CIUDAD_NAC,
    },
  };
}
