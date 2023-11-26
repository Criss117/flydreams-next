"use client";

import { aeropuerto } from "@/utilities";
import Link from "next/link";
import { useEffect, useState } from "react";
import ActualizarAeroForm from "./_components/actualizar_aero_form";

type Params = {
  params: { aeropuerto_id: string };
};
const ActualizarAeropuerto = ({ params }: Params) => {
  const { aeropuerto_id } = params;
  const [aeropuerto, setAeropuerto] = useState<aeropuerto>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getAeropuerto = async () => {
      const url =
        process.env.NEXT_PUBLIC_API_FRONT_URL +
        "/aeropuertos/get/" +
        aeropuerto_id;
      const res = await fetch(url);
      const data = await res.json();
      setAeropuerto(data.aeropuerto);
    };
    getAeropuerto();
    setLoading(false);
  }, [aeropuerto_id]);
  return (
    <>
      <div className="mt-2 mx-2">
        <Link
          href={`/dashboard/aeropuertos/${aeropuerto_id}`}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Atras
        </Link>
      </div>
      <main className="flex flex-col justify-center items-center w-full gap-5 mt-[15rem]">
        {aeropuerto === undefined || loading ? (
          "Cargando..."
        ) : (
          <ActualizarAeroForm aeroInfo={aeropuerto} />
        )}
      </main>
    </>
  );
};

export default ActualizarAeropuerto;
