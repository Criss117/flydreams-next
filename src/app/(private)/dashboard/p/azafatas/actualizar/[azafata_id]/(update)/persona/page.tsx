"use client";
import CreatePersonaForm from "@/app/(private)/dashboard/p/_components/create_persona_form";
import Link from "next/link";
import { useUpdateAzafataContext } from "../../../_context/update-azafata.context";

const CreatePersona = () => {
  const { onSubmit, persona, setPersona, error, azafata } =
    useUpdateAzafataContext();

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
        <CreatePersonaForm
          tittle={"Actualizar Azafata"}
          persona={persona}
          setPersona={setPersona}
          error={error}
        />
        <div className="flex gap-5">
          <Link
            href={`/dashboard/p/azafatas/actualizar/${azafata.azafata_id}/azafata`}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Atras
          </Link>
          <button
            onClick={onSubmit}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Actualizar Azafata
          </button>
        </div>
      </main>
    </>
  );
};

export default CreatePersona;
