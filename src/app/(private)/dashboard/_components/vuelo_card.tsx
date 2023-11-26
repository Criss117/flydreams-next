import { vuelo } from "@/utilities/types";
import Link from "next/link";
import { formatDate } from "../../../../utilities/funtions/formatDate";

const VueloCard = ({ vuelo }: { vuelo: vuelo }) => {
  return (
    <Link
      href={`/dashboard/vuelos/actualizar/${vuelo.VUELO_ID}`}
      className="
        bg-blue-500 
        rounded-lg 
        shadow-md 
        text-white 
        py-2 
        hover:cursor-pointer 
        hover:bg-blue-600
        transition-all
        flex
        flex-col"
    >
      <span className="px-2 text-2xl font-bold">{vuelo.DESTINO}</span>
      {vuelo.AEROPUERTO_LLEGADA && (
        <span className="px-2 font-bold mt-2">
          aeropuerto de llegada:{" "}
          <span className="font-normal block">{vuelo.AEROPUERTO_LLEGADA}</span>
        </span>
      )}
      {vuelo.AEROPUERTO_SALIDA && (
        <span className="px-2 font-bold mt-2">
          aeropuerto de salida:{" "}
          <span className="font-normal block">{vuelo.AEROPUERTO_SALIDA}</span>
        </span>
      )}
      <span className="px-2 font-bold mt-2">
        fecha de salida:{" "}
        <span className="font-normal block">
          {formatDate(vuelo.FECHA_LLEGADA)}
        </span>
      </span>
      <span className="px-2 font-bold mt-2">
        fecha de llegada:{" "}
        <span className="font-normal block">
          {formatDate(vuelo.FECHA_SALIDA)}
        </span>
      </span>

      <span className="px-2 font-bold mt-2">
        Cantidad de pasajeros:{" "}
        <span className="font-normal">{vuelo.CANTIDAD_PASAJEROS}</span>
      </span>
    </Link>
  );
};

export default VueloCard;
