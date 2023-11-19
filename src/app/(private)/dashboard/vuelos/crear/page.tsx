"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import CrearVuelosForm from "../_components/crear_vuelos_form";
import { Datos } from "@/utilities/types/vuelo_info";

const CreateVuelos = () => {
  const [infoToCreate, setInfoToCreate] = useState<Datos>();
  useEffect(() => {
    const getInfoToCreate = async () => {
      const url = process.env.NEXT_PUBLIC_API_FRONT_URL + "/vuelos/create";
      const res = await fetch(url);
      const data = await res.json();
      setInfoToCreate(data);
    };
    getInfoToCreate();
  }, []);
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
        <CrearVuelosForm datos={infoToCreate} />
      </main>
    </>
  );
};

export default CreateVuelos;
