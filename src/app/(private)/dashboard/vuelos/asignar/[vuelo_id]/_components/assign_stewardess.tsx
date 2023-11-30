"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AzafataInfo } from "@/utilities";

const AssignStewardess = ({
  fn,
  loading,
}: {
  fn: (azafata_id: number, e: FormEvent<HTMLFormElement>) => Promise<void>;
  loading: boolean;
}) => {
  const [azafatas, setAzafatas] = useState<AzafataInfo[]>([]);
  const [azafataId, setAzafataId] = useState<number>();
  const { push } = useRouter();
  useEffect(() => {
    const getAzafatas = async () => {
      const url = process.env.NEXT_PUBLIC_API_FRONT_URL + "/azafata/get/all/1";
      const res = await fetch(url);
      const data = await res.json();
      if (data.code === "NJS-105" || data.azafatas.length === 0) {
        push("/dashboard/vuelos/1");
        return;
      }
      setAzafatas(data.azafatas);
      return;
    };
    getAzafatas();
  }, [push]);

  return (
    <form
      onSubmit={(e) => {
        azafataId !== undefined && fn(azafataId, e);
      }}
      className="flex flex-col justify-center items-center w-full gap-5 mt-10"
    >
      <header className="flex flex-col text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Asignar azafata</h2>
      </header>
      <fieldset className="flex flex-col">
        <label>Seleccione una azafata</label>
        <select
          defaultValue={"0"}
          onChange={(e) => {
            setAzafataId(parseInt(e.target.value));
          }}
        >
          <option value="0" disabled>
            --seleccione--
          </option>
          {azafatas?.map((azafata) => (
            <option value={azafata.AZAFATA_ID} key={azafata.AZAFATA_ID}>
              {azafata.NOMBRE} {azafata.APELLIDO}
            </option>
          ))}
        </select>
      </fieldset>
      <input
        type="submit"
        value={loading ? "Agregando..." : "Agregar azafata"}
        className="p-2 text-center bg-blue-500 text-white rounded-lg hover:cursor-pointer hover:bg-blue-600 transition-all"
      />
    </form>
  );
};

export default AssignStewardess;
