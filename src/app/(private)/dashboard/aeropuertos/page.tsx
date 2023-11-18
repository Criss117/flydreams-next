"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AeropuertoCard from "./_components/aeropuerto_card";

const Aeropuertos = () => {
  const url = process.env.NEXT_PUBLIC_API_FRONT_URL + "/aeropuertos/get/all";
  const [aeropuertos, setAeropuertos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAeropuertos = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setAeropuertos(data);
    };
    getAeropuertos();
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
          href={"/dashboard/aeropuertos/crear"}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Agregar Aeropuerto
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-10 mx-2">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          aeropuertos.map((aeropuerto, index) => (
            <AeropuertoCard key={index} aeropuerto={aeropuerto} />
          ))
        )}
      </div>
    </main>
  );
};

export default Aeropuertos;
