"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import VuelosTable from "../_components/vuelos_table";
import { vuelo_info } from "@/utilities/types/vuelo_info";

const Vuelos = ({ params }: { params: { page: string } }) => {
  const { page } = params;
  const [vuelos, setVuelos] = useState<vuelo_info[]>([]);
  const { push } = useRouter();

  useEffect(() => {
    const getVuelos = async () => {
      const url =
        process.env.NEXT_PUBLIC_API_FRONT_URL + "/vuelos/get/all/" + page;
      const res = await fetch(url);
      const data = await res.json();
      if (data.code === "NJS-105" || data.vuelos.length === 0) {
        push("/dashboard/vuelos/1");
        return;
      }
      setVuelos(data.vuelos);
    };
    getVuelos();
  }, [push, page]);

  return (
    <main>
      <div className="mt-2 mx-2 flex justify-around">
        <Link
          href={"/dashboard/home"}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Home
        </Link>
        <Link
          href={"/dashboard/vuelos/crear"}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Agregar Vuelo
        </Link>
      </div>
      <section className="flex justify-center">
        <VuelosTable vuelos={vuelos} />
      </section>
    </main>
  );
};

export default Vuelos;
