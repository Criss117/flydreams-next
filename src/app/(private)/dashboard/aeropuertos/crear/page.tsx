"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const AeropuertoForm = () => {
  const [nombre, setNombre] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_API_FRONT_URL;
    setError("");
    if (!nombre || !pais || !ciudad) {
      setError("Faltan datos");
      return;
    }
    setLoading(true);
    const res = await fetch(`${url}/aeropuertos/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        pais,
        ciudad,
      }),
    });

    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      setNombre("");
      setPais("");
      setCiudad("");
      setError("");
    }
    push("/dashboard/aeropuertos");
    setLoading(false);
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
        <header className="flex flex-col text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Agregar aeropuerto</h2>
        </header>
        {error.length > 0 && <p>{error}</p>}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col w-full md:max-w-[80%] md:min-w-[60%] items-center gap-y-5"
        >
          <input
            onInput={(e) => setNombre((e.target as HTMLInputElement).value)}
            type="text"
            placeholder="Nombre"
          />
          <input
            onInput={(e) => setPais((e.target as HTMLInputElement).value)}
            type="text"
            placeholder="Pais"
          />
          <input
            onInput={(e) => setCiudad((e.target as HTMLInputElement).value)}
            type="text"
            placeholder="Ciudad"
          />
          <input
            type="submit"
            value={loading ? "Agregando..." : "Agregar aeropuerto"}
            className="p-2 text-center bg-blue-500 text-white rounded-lg hover:cursor-pointer hover:bg-blue-600 transition-all"
          />
        </form>
      </main>
    </>
  );
};

export default AeropuertoForm;
