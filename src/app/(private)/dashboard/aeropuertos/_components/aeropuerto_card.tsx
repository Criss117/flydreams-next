import Link from "next/link";
import { aeropuerto } from "@/utilities/types";

const AeropuertoCard = ({ aeropuerto }: { aeropuerto: aeropuerto }) => {
  return (
    <Link
      href={`/dashboard/aeropuertos/${aeropuerto.AEROPUERTO_ID}`}
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
      <span className="px-2 text-2xl font-bold">{aeropuerto.NOMBRE}</span>
      <span className="px-2">{aeropuerto.CIUDAD}</span>
      <span className="px-2">{aeropuerto.PAIS}</span>
    </Link>
  );
};

export default AeropuertoCard;
