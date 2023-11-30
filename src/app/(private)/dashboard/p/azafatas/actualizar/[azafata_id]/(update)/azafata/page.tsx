"use client";
import Link from "next/link";
import CrearAzafataForm from "../../../../crear/_components/crear_azafata_form";
import { useUpdateAzafataContext } from "../../../_context/update-azafata.context";

const UpdateAzafata = () => {
  const { azafata, setAzafata, error } = useUpdateAzafataContext();
  const id = azafata.azafata_id;
  return (
    <>
      <div className="mt-2 mx-2">
        <Link
          href={"/dashboard/p/azafatas/1"}
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
          href={`/dashboard/p/azafatas/actualizar/${id}/persona`}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Siguiente
        </Link>
      </main>
    </>
  );
};

export default UpdateAzafata;
