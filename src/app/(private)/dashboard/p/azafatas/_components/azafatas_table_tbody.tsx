import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AzafataInfo } from "@/utilities";
import DeleteSVG from "@/../public/svg/delete.svg";
import EditSVG from "@/../public/svg/edit.svg";

const AzafatasTableTBody = ({ azafatas }: { azafatas: AzafataInfo[] }) => {
  const [azafatasState, setAzafatasState] = useState<AzafataInfo[]>([]);
  useEffect(() => {
    setAzafatasState(azafatas);
  }, [azafatas]);
  const handleClick = async (azafata: AzafataInfo) => {
    const dlte = confirm(
      `Eliminar azafata ${azafata.NOMBRE} ${azafata.APELLIDO}`
    );
    if (dlte) {
      const url =
        process.env.NEXT_PUBLIC_API_FRONT_URL +
        "/azafata/delete/" +
        azafata.AZAFATA_ID;
      const res = await fetch(url, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.response) {
        const newAzafatas = azafatas.filter(
          (v) => v.AZAFATA_ID !== azafata.AZAFATA_ID
        );
        setAzafatasState(newAzafatas);
        return;
      }
    } else {
      return;
    }
  };
  return (
    <tbody>
      {azafatasState.map((azafata, index) => (
        <tr key={index}>
          <td className="px-2 pb-1 border-b-2 border-black">
            {azafata.NUMERO_IDENTIFICACION}
          </td>
          <td className="px-2 pb-1 border-b-2 border-black">
            {azafata.NOMBRE} {azafata.APELLIDO}
          </td>
          <td className="px-2 pb-1 border-b-2 border-black">
            {azafata.PAIS_NAC}
          </td>
          <td className="px-2 pb-1 border-b-2 border-black">
            {azafata.CIUDAD_NAC}
          </td>
          <td className="px-2 pb-1 border-b-2 border-black">
            {azafata.VUELOS_ABORDADOS}
          </td>
          <td className="px-2 pb-1 border-b-2 border-black">
            {azafata.IDIOMA_NATAL}
          </td>
          <td className="px-2 pb-1 border-b-2 border-black">
            {azafata.IDIOMA_SECUNDARIO}
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
              href={`/dashboard/p/azafatas/actualizar/${azafata.AZAFATA_ID}/azafata`}
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
            onClick={() => handleClick(azafata)}
          >
            <Image src={DeleteSVG} alt="delete" width={20} height={20} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default AzafatasTableTBody;
