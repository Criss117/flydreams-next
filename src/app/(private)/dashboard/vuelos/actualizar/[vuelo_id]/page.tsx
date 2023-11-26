"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ActualizarVueloForm from "./_components/actualizar_vuelo_form";
import { Datos, vuelo_info } from "@/utilities/types/vuelo_info";

const ActualizarVuelo = ({ params }: { params: { vuelo_id: string } }) => {
  const [infoToCreate, setInfoToCreate] = useState<Datos>();
  const [vuelo, setVuelo] = useState<vuelo_info>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getInfoToUpdate = async () => {
      const url = process.env.NEXT_PUBLIC_API_FRONT_URL + "/vuelos/create";
      const res = await fetch(url);
      const data = await res.json();

      const url2 =
        process.env.NEXT_PUBLIC_API_FRONT_URL +
        "/vuelos/get/one/" +
        params.vuelo_id;
      const res2 = await fetch(url2);
      const data2 = await res2.json();
      setVuelo(data2.vuelo);
      setInfoToCreate(data);
    };
    getInfoToUpdate();
    setLoading(false);
  }, [params.vuelo_id]);
  return (
    <>
      <div className="mt-2 mx-2">
        <Link
          href={"/dashboard/vuelos"}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Atras
        </Link>
      </div>
      <main className="flex flex-col justify-center items-center w-full gap-5 mt-[15rem]">
        {vuelo === undefined || infoToCreate === undefined || loading ? (
          "Cargando..."
        ) : (
          <ActualizarVueloForm datos={infoToCreate} vueloInfo={vuelo} />
        )}
      </main>
    </>
  );
};

export default ActualizarVuelo;
