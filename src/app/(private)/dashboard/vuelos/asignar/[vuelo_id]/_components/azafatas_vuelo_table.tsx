import Image from "next/image";
import DeleteSVG from "@/../public/svg/delete.svg";
import { AzafataInfo } from "@/utilities";
import { useEffect, useState } from "react";

type Params = {
  azafatas: AzafataInfo[];
  vueloId: number;
};

const AzafatasVueloTable = ({ azafatas, vueloId }: Params) => {
  const [azafatasState, setAzafatasState] = useState<AzafataInfo[]>();
  useEffect(() => {
    setAzafatasState(azafatas);
  }, [azafatas]);

  const handleClick = async (azafata: AzafataInfo) => {
    const dlt = confirm(
      `¿Deseas eliminar a ${azafata.NOMBRE} ${azafata.APELLIDO} del vuelo?`
    );
    if (!dlt) return;
    const url =
      process.env.NEXT_PUBLIC_API_FRONT_URL +
      "/azafata/delete/from-vuelo?vuelo_id=" +
      vueloId +
      "&azafata_id=" +
      azafata.AZAFATA_ID;
    const res = await fetch(url, {
      method: "DELETE",
    }).then((res) => res.json());

    if (res.response) {
      const newAzafatas = azafatasState?.filter(
        (azafataState) => azafataState.AZAFATA_ID != azafata.AZAFATA_ID
      );
      setAzafatasState(newAzafatas);
      return;
    }
    alert("Ocurrio un error");
  };

  return (
    <table className="mt-10">
      <thead className="border-b-2 border-black">
        <tr>
          <th className="px-2">Azafatas</th>
          <th className="px-2">Eliminar del vuelo</th>
        </tr>
      </thead>
      <tbody>
        {azafatasState != undefined &&
          azafatasState.map((azafata) => (
            <tr key={azafata.AZAFATA_ID}>
              <td
                className="
                  px-2 pb-1 border-b-2 border-black"
              >
                {azafata.NOMBRE} {azafata.APELLIDO}
              </td>
              <td
                onClick={() => handleClick(azafata)}
                className="
                  px-2 
                  pb-1 
                  border-b-2 
                  border-black
                  hover:cursor-pointer 
                  hover:bg-red-200
                  transition-all
                  "
              >
                <Image
                  className="mx-auto"
                  src={DeleteSVG}
                  alt="delete"
                  width={20}
                  height={20}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default AzafatasVueloTable;
