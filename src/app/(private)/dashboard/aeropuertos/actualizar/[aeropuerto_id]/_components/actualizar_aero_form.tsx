"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { aeropuerto } from "@/utilities";
import { useRouter } from "next/navigation";

const ActualizarAeroForm = ({ aeroInfo }: { aeroInfo: aeropuerto }) => {
  const [nombre, setNombre] = useState<string>();
  const [pais, setPais] = useState<string>();
  const [ciudad, setCiudad] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const startStates = async () => {
      setNombre(aeroInfo.NOMBRE);
      setPais(aeroInfo.PAIS);
      setCiudad(aeroInfo.CIUDAD);
    };
    startStates();
  }, [aeroInfo]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_API_FRONT_URL;
    setError("");
    if (!nombre || !pais || !ciudad) {
      setError("Faltan datos");
      return;
    }
    setLoading(true);
    const res = await fetch(
      `${url}/aeropuertos/update/${aeroInfo.AEROPUERTO_ID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          ciudad,
          pais,
        }),
      }
    );

    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      setNombre("");
      setPais("");
      setCiudad("");
      setError("");
    }
    push(`/dashboard/aeropuertos/${aeroInfo.AEROPUERTO_ID}`);
    setLoading(false);
  };

  return (
    <>
      <header className="flex flex-col text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Agregar aeropuerto</h2>
      </header>
      {error != undefined && error.length > 0 && <p>{error}</p>}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full md:max-w-[80%] md:min-w-[60%] items-center gap-y-5"
      >
        {nombre != undefined && (
          <input
            onInput={(e) => setNombre((e.target as HTMLInputElement).value)}
            type="text"
            placeholder="Nombre"
            defaultValue={nombre}
          />
        )}
        {pais != undefined && (
          <input
            onInput={(e) => setPais((e.target as HTMLInputElement).value)}
            type="text"
            placeholder="Pais"
            defaultValue={pais}
          />
        )}
        {ciudad != undefined && (
          <input
            onInput={(e) => setCiudad((e.target as HTMLInputElement).value)}
            type="text"
            placeholder="Ciudad"
            defaultValue={ciudad}
          />
        )}
        <input
          type="submit"
          value={loading ? "Agregando..." : "Agregar aeropuerto"}
          className="p-2 text-center bg-blue-500 text-white rounded-lg hover:cursor-pointer hover:bg-blue-600 transition-all"
        />
      </form>
    </>
  );
};

export default ActualizarAeroForm;
