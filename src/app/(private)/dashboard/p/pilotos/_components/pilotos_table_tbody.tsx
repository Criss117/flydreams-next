import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PilotoInfo } from "@/utilities";
import DeleteSVG from "@/../public/svg/delete.svg";
import EditSVG from "@/../public/svg/edit.svg";

const PilotosTableTBody = ({ pilotos }: { pilotos: PilotoInfo[] }) => {
  const [pilotosState, setPilotosState] = useState<PilotoInfo[]>([]);
  useEffect(() => {
    setPilotosState(pilotos);
  }, [pilotos]);
  const handleClick = async (piloto: PilotoInfo) => {
    const dlte = confirm(`Eliminar piloto ${piloto.NOMBRE} ${piloto.APELLIDO}`);
    if (dlte) {
      const url =
        process.env.NEXT_PUBLIC_API_FRONT_URL +
        "/piloto/delete/" +
        piloto.PILOTO_ID;
      const res = await fetch(url, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.response) {
        const newPilotos = pilotos.filter(
          (v) => v.PILOTO_ID !== piloto.PILOTO_ID
        );
        setPilotosState(newPilotos);
        return;
      }
    } else {
      return;
    }
  };
  return (
    <tbody>
      {pilotosState.map((piloto, index) => (
        <tr key={index}>
          <td className="px-2 pb-1 border-b-2 border-black">
            {piloto.NUMERO_IDENTIFICACION}
          </td>
          <td className="px-2 pb-1 border-b-2 border-black">
            {piloto.NOMBRE} {piloto.APELLIDO}
          </td>
          <td className="px-2 pb-1 border-b-2 border-black">
            {piloto.PAIS_NAC}
          </td>
          <td className="px-2 pb-1 border-b-2 border-black">
            {piloto.CIUDAD_NAC}
          </td>
          <td className="px-2 pb-1 border-b-2 border-black">{piloto.VUELOS}</td>
          <td className="px-2 pb-1 border-b-2 border-black">
            {piloto.LICENCIA}
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
            <Link
              href={`/dashboard/p/pilotos/actualizar/${piloto.PILOTO_ID}/piloto`}
            >
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
            onClick={() => handleClick(piloto)}
          >
            <Image src={DeleteSVG} alt="delete" width={20} height={20} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default PilotosTableTBody;
