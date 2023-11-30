"use client";
import Link from "next/link";
import { useCreatePasajeroContext } from "../_context/create-pasajero.context";
import CrearPasajeroForm from "../_components/crear_azafata_form";

const CreatePasajero = () => {
  const { pasajero, setPasajero, error } = useCreatePasajeroContext();
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
        <CrearPasajeroForm
          pasajero={pasajero}
          setPasajero={setPasajero}
          error={error}
        />
        <Link
          href={"/dashboard/p/pasajeros/crear/persona"}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Siguiente
        </Link>
      </main>
    </>
  );
};

export default CreatePasajero;
