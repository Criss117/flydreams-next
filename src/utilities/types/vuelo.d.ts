export type vuelo = {
  VUELO_ID: number;
  AEROPUERTO_SALIDA_ID: number;
  AEROPUERTO_SALIDA?: string;
  AEROPUERTO_LLEGADA_ID: number;
  AEROPUERTO_LLEGADA?: string;
  AVION_ID: number;
  DESTINO: string;
  FECHA_SALIDA: string;
  FECHA_LLEGADA: string;
  CANTIDAD_PASAJEROS: number;
};

export type VueloFront = {
  destino: string;
  fechaSalida: string;
  fechaLlegada: string;
  aeroSalidaId: number;
  aeroLlegadaId: number;
  avionId: number;
};
