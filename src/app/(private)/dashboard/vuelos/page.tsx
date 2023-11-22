"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import VueloCard from "./_components/vuelo_card";

const Vuelos = () => {
  const url = process.env.NEXT_PUBLIC_API_FRONT_URL + "/vuelos/get/all";
  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVuelos = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setVuelos(data.vuelos);
    };
    getVuelos();
    setLoading(false);
  }, [url]);

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
      <div className="grid grid-cols-4 gap-5 mt-10 mx-2">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          vuelos.map((vuelo, index) => <VueloCard key={index} vuelo={vuelo} />)
        )}
      </div>
    </main>
  );
};

export default Vuelos;
