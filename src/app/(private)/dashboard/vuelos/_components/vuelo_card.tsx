import Link from "next/link";
import { vuelo_info } from "@/utilities/types/vuelo_info";
import { formatDate } from "@/utilities";

const VueloCard = ({ vuelo }: { vuelo: vuelo_info }) => {
  return (
    <Link
      href={`/dashboard/vuelos/${vuelo.VUELO_ID}`}
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
      <span className="px-2 mb-5">
        Vuelo con destino a:{" "}
        <span className="text-2xl font-bold">{vuelo.DESTINO}</span>
      </span>
      <div className="flex flex-col mb-2 border-b-2">
        <span className="px-2">
          Aeropuerto de salida:{" "}
          <span className="text-xl">{vuelo.AEROPUERTO_SALIDA}</span>
        </span>
        <span className="px-2">
          Aeropuerto de llegada:{" "}
          <span className="text-xl">{vuelo.AEROPUERTO_LLEGADA} </span>
        </span>
      </div>
      <div className="flex flex-col">
        <span className="px-2">
          Fecha de salida:{" "}
          <span className="text-xl block">
            {formatDate(vuelo.FECHA_SALIDA)}{" "}
          </span>
        </span>

        <span className="px-2">
          Fecha de llegada:{" "}
          <span className="text-xl block">
            {formatDate(vuelo.FECHA_LLEGADA)}{" "}
          </span>
        </span>
      </div>
    </Link>
  );
};

export default VueloCard;
