export type AzafataInfo = {
  AZAFATA_ID: number;
  VUELOS_ABORDADOS: number;
  IDIOMA_NATAL: string;
  IDIOMA_SECUNDARIO: string;
  PERSONA_ID: number;
  GENERO_ID: number;
  NUMERO_IDENTIFICACION: number;
  NOMBRE: string;
  APELLIDO: string;
  FECHA_NAC: string;
  PAIS_NAC: string;
  CIUDAD_NAC: string;
};

export type PilotoInfo = {
  PILOTO_ID: number;
  VUELOS: number;
  LICENCIA: string;
  PERSONA_ID: number;
  GENERO_ID: number;
  NUMERO_IDENTIFICACION: number;
  NOMBRE: string;
  APELLIDO: string;
  FECHA_NAC: string;
  PAIS_NAC: string;
  CIUDAD_NAC: string;
};
