"use client";
import Link from "next/link";
import { useEffect } from "react";
const AsignarForm = ({ params }: { params: { pasajero_id: string } }) => {
  useEffect(() => {
    document.title = "Asignar Vuelo";
  }, []);

  return (
    <>
      <div className="mt-2 mx-2">
        <Link
          href={"/dashboard/aeropuertos"}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Atras
        </Link>
      </div>
      <main className="flex flex-col justify-center items-center w-full gap-5 mt-[15rem]">
        <header className="flex flex-col text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Agregar aeropuerto</h2>
        </header>

        <form className="flex flex-col w-full md:max-w-[80%] md:min-w-[60%] items-center gap-y-5">
          <input type="text" placeholder="Nombre" />
          <input
            type="submit"
            value="Agregar aeropuerto"
            className="p-2 text-center bg-blue-500 text-white rounded-lg hover:cursor-pointer hover:bg-blue-600 transition-all"
          />
        </form>
      </main>
    </>
  );
};

export default AsignarForm;
