"use client";
import Link from "next/link";
import CrearAzafataForm from "../_components/crear_azafata_form";
import { useCreateAzafataContext } from "../_context/create-azafata.context";

const CreateAzafata = () => {
  const { azafata, setAzafata, error } = useCreateAzafataContext();
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
        <CrearAzafataForm
          azafata={azafata}
          setAzafata={setAzafata}
          error={error}
        />
        <Link
          href={"/dashboard/p/azafatas/crear/persona"}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Siguiente
        </Link>
      </main>
    </>
  );
};

export default CreateAzafata;
