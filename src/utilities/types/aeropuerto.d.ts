import { vuelo } from ".";

export type aeropuerto = {
  AEROPUERTO_ID: number;
  CIUDAD: string;
  NOMBRE: string;
  PAIS: string;
};

export type aeropuertoInfo = {
  aeropuerto: aeropuerto;
  llegada: vuelo[];
  salida: vuelo[];
};
