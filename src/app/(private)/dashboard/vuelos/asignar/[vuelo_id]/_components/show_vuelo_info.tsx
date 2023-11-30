"use client";
import { FormEvent, useEffect, useState } from "react";
import { vuelo_info } from "@/utilities/types/vuelo_info";
import { formatDate } from "../../../../../../../utilities/funtions/formatDate";
import AssignStewardess from "./assign_stewardess";
import { AzafataInfo, ERRORS_DB } from "@/utilities";
import AzafatasVueloTable from "./azafatas_vuelo_table";

const ShowVueloInfo = ({ vuelo }: { vuelo: vuelo_info }) => {
  const [azafatas, setAzafatas] = useState<AzafataInfo[]>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getAzafatas = async () => {
      const url =
        process.env.NEXT_PUBLIC_API_FRONT_URL +
        "/azafata/get/by-vuelo/" +
        vuelo.VUELO_ID;
      const res = await fetch(url);
      const data = await res.json();
      setAzafatas(data.azafatas);
    };
    getAzafatas();
  }, [vuelo, refresh]);

  const assignStewardess = async (
    azafata_id: number,
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (azafata_id === 0) {
      return;
    }
    setLoading(true);
    const url = process.env.NEXT_PUBLIC_API_FRONT_URL + "/azafata/assign";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vuelo_id: vuelo.VUELO_ID, azafata_id }),
    });
    const data = await res.json();
    if (data.errorNum) {
      setError(ERRORS_DB.find((e) => e.errorNum === data.errorNum)?.mgs);
    } else {
      setError("Asignacion exitosa");
    }
    setTimeout(() => {
      setError("");
    }, 5000);
    setRefresh(!refresh);
    setLoading(false);
  };

  return (
    <>
      <header className="bg-blue-50 mt-5 p-2 flex justify-around items-center">
        <h2 className="text-2xl font-bold">
          Vuelo con destino a:{" "}
          <span className="text-3xl font-bold">{vuelo.DESTINO}</span>
        </h2>
        <div>
          <p>
            Fecha de salida:{" "}
            <span className="text-xl font-bold">
              {formatDate(vuelo.FECHA_SALIDA)}
            </span>
          </p>
          <p>
            Fecha de llegada:{" "}
            <span className="text-xl font-bold">
              {formatDate(vuelo.FECHA_LLEGADA)}
            </span>
          </p>
        </div>
      </header>
      <section className="flex justify-center">
        {azafatas != undefined && (
          <AzafatasVueloTable azafatas={azafatas} vueloId={vuelo.VUELO_ID} />
        )}
      </section>

      {error && (
        <p className="text-center p-2 text-black bg-red-300 rounded-lg">
          {error}
        </p>
      )}
      <AssignStewardess fn={assignStewardess} loading={loading} />
    </>
  );
};

export default ShowVueloInfo;
