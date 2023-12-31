"use client";
import { aeropuertoInfo, dbError } from "@/utilities/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ShowInfo from "./_components/show_info";

const Aeropuerto = ({ params }: { params: { aeropuerto_id: string } }) => {
  const url =
    process.env.NEXT_PUBLIC_API_FRONT_URL +
    "/aeropuertos/get/with-info/" +
    params.aeropuerto_id;

  const [aeropuertoInfo, setAeropuertoInfo] = useState<aeropuertoInfo>();
  const { push } = useRouter();

  const handleClick = async (aero_id: number) => {
    const dlte = confirm(`Eliminar el vuelo este aeropuerto`);
    if (dlte) {
      const url =
        process.env.NEXT_PUBLIC_API_FRONT_URL +
        "/aeropuertos/delete/" +
        aero_id;
      const res = await fetch(url, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.response) {
        push("/dashboard/aeropuertos");
        return;
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    const getAeropuertoInfo = async () => {
      const res = await fetch(url);
      const data: aeropuertoInfo | dbError = await res.json();
      if ("errorNum" in data) {
        push("/dashboard/aeropuertos");
        return;
      }
      setAeropuertoInfo(data);
    };
    getAeropuertoInfo();
  }, [url, push]);

  return (
    <main>
      <div className="mt-2 mx-2 flex justify-around">
        <Link
          href={"/dashboard/aeropuertos"}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Atras
        </Link>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/aeropuertos/actualizar/${
              aeropuertoInfo?.aeropuerto?.AEROPUERTO_ID || 0
            }`}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Modificar Aeropuerto
          </Link>
          {aeropuertoInfo && (
            <button
              onClick={() =>
                handleClick(aeropuertoInfo.aeropuerto.AEROPUERTO_ID)
              }
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
      <ShowInfo aeropuertoInfo={aeropuertoInfo} />
    </main>
  );
};

export default Aeropuerto;
