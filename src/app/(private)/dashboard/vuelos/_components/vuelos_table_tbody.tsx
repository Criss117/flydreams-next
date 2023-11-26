"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { vuelo_info } from "@/utilities/types/vuelo_info";
import { formatDate } from "@/utilities";
import DeleteSVG from "@/../public/svg/delete.svg";
import EditSVG from "@/../public/svg/edit.svg";

const VuelosTableTBody = ({ vuelos }: { vuelos: vuelo_info[] }) => {
  const [vuelosState, setVuelosState] = useState<vuelo_info[]>([]);
  useEffect(() => {
    setVuelosState(vuelos);
  }, [vuelos]);
  const handleClick = async (vuelo: vuelo_info) => {
    const dlte = confirm(
      `Eliminar el vuelo ${vuelo.VUELO_ID} con destino a ${vuelo.DESTINO}`
    );
    if (dlte) {
      const url =
        process.env.NEXT_PUBLIC_API_FRONT_URL +
        "/vuelos/delete/" +
        vuelo.VUELO_ID;
      const res = await fetch(url, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.response) {
        const newVuelos = vuelos.filter((v) => v.VUELO_ID !== vuelo.VUELO_ID);
        setVuelosState(newVuelos);
        return;
      }
    } else {
      return;
    }
  };

  return (
    <tbody>
      {vuelosState.map((vuelo, index) => (
        <tr key={index}>
          <td className="px-2 pb-1 border-b-2 border-black">{vuelo.DESTINO}</td>
          <td className="px-2 pb-1 border-b-2 border-black">
            {vuelo.AEROPUERTO_SALIDA}
          </td>
          <td className="px-2 pb-1 border-b-2 border-black">
            {vuelo.AEROPUERTO_LLEGADA}
          </td>
          <td className="px-2 pb-1 border-b-2 border-black">
            {formatDate(vuelo.FECHA_SALIDA)}
          </td>
          <td className="px-2 pb-1 border-b-2 border-black">
            {formatDate(vuelo.FECHA_LLEGADA)}
          </td>
          <td
            className="
              px-2 
              pb-1 
              border-b-2 
              border-black 
              hover:cursor-pointer 
              hover:bg-slate-300
              transition-all
              rounded-lg
              "
          >
            <Link href={`/dashboard/vuelos/actualizar/${vuelo.VUELO_ID}`}>
              <Image src={EditSVG} alt="edit" width={20} height={20} />
            </Link>
          </td>
          <td
            className="
              px-2 
              pb-1 
              border-b-2 
              border-black
              hover:cursor-pointer 
              hover:bg-red-200
              transition-all
              rounded-lg"
            onClick={() => handleClick(vuelo)}
          >
            <Image src={DeleteSVG} alt="delete" width={20} height={20} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default VuelosTableTBody;
