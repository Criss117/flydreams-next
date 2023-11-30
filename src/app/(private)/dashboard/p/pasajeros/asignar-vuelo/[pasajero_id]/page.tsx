"use client";
import Link from "next/link";
import { vuelo } from "@/utilities";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const Asignar = ({ params }: { params: { pasajero_id: string } }) => {
  const [pasajero, setPasajero] = useState<{}>();
  const [vuelos, setVuelos] = useState<vuelo[]>();
  const [vueloId, setVueloId] = useState<number>();
  const [error, setError] = useState<string>();
  const { push } = useRouter();

  useEffect(() => {
    const getPasajero = async () => {
      const url =
        process.env.NEXT_PUBLIC_API_FRONT_URL +
        "/pasajeros/get/" +
        params.pasajero_id;

      const res = await fetch(url);
      const data = await res.json();
      setPasajero({ ...data.pasajero, ...data.persona });
    };
    const getVuelos = async () => {
      const url = process.env.NEXT_PUBLIC_API_FRONT_URL + "/vuelos/get/all/1";

      const res = await fetch(url);
      const data = await res.json();

      setVuelos(data.vuelos);
    };
    getPasajero();
    getVuelos();
  }, [params.pasajero_id]);

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (vueloId === undefined || vueloId <= 0) {
      setError("Debe elegir un vuelo");
    }
    const url =
      process.env.NEXT_PUBLIC_API_FRONT_URL + "/pasajeros/asignar-vuelo";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pasajero_id: +params.pasajero_id,
        vuelo_id: vueloId,
      }),
    };
    const res = await fetch(url, options);
    const data = await res.json();
    if ((data.errorNum = 1)) {
      setError("No se pudo asignar el vuelo");
    }
    if (data.response) {
      push(`/dashboard/p/pasajeros`);
    }
    return;
  };

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
        <header className="w-[40rem]">
          <div className="w-full bg-cyan-100 mb-10">
            <p className="text-3xl text-center">
              Pasajero {pasajero?.PASAJERO_ID}, {pasajero?.NOMBRE}{" "}
              {pasajero?.APELLIDO}
            </p>
          </div>
          {error && (
            <div className="w-full bg-red-100 mb-10">
              <p className="text-3xl text-center">{error}</p>
            </div>
          )}
        </header>
        <h2 className="text-3xl md:text-4xl font-bold">Asignar vuelo</h2>
        <form
          onSubmit={(e) => handleClick(e)}
          className="flex flex-col w-full md:max-w-[80%] md:min-w-[60%] items-center gap-y-5"
        >
          <select
            defaultValue={0}
            className="text-center"
            onChange={(e) => setVueloId(Number(e.target.value))}
          >
            <option value="0" disabled>
              --Seleccione--
            </option>
            {vuelos?.map((vuelo) => (
              <option key={vuelo.VUELO_ID} value={vuelo.VUELO_ID}>
                Vuelo {vuelo.VUELO_ID} con destino {vuelo.DESTINO}
              </option>
            ))}
          </select>
          <input
            className="p-2 text-center bg-blue-500 text-white rounded-lg hover:cursor-pointer hover:bg-blue-600 transition-all"
            type="submit"
            value={"Asignar Vuelo"}
          />
        </form>
      </main>
    </>
  );
};

export default Asignar;
