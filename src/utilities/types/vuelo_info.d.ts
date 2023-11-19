export type vuelo_info = {
  VUELO_ID: number;
  AEOPUERTO_SALIDA_ID: number;
  AEROPUERTO_LLEGADA_ID: number;
  AEROPUERTO_SALIDA: string;
  AEROPUERTO_LLEGADA: string;
  DESTINO: string;
  FECHA_SALIDA: string;
  FECHA_LLEGADA: string;
  CANTIDAD_PASAJEROS: number;
};

export type Aeropuerto = {
  AEROPUERTO_ID: number;
  NOMBRE: string;
};

export type Avion = {
  AVION_ID: number;
  TIPO_AVION: string;
};

export type Datos = {
  aeropuertos: Aeropuerto[];
  aviones: Avion[];
};
