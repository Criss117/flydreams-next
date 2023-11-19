"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Datos } from "@/utilities/types/vuelo_info";

const CrearVuelosForm = ({ datos }: { datos: Datos | undefined }) => {
  const [destino, setDestino] = useState("");
  const [avionId, setAvionId] = useState(-1);
  const [aeroSalidaId, setAeroSalidaId] = useState(-1);
  const [aeroLlegadaId, setAeroLlegadaId] = useState(-1);
  const [fechaSalida, setFechaSalida] = useState("");
  const [fechallegada, setFechaLlegada] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !destino ||
      !avionId ||
      !aeroSalidaId ||
      !aeroLlegadaId ||
      !fechaSalida ||
      !fechallegada
    ) {
      setError("Faltan datos");
      return;
    }
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_FRONT_URL}/vuelos/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destino,
        avionId,
        aeroSalidaId,
        aeroLlegadaId,
        fechaSalida,
        fechallegada,
      }),
    }).then((res) => res.json());
  };

  return (
    <>
      <header className="flex flex-col text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Agregar vuelo</h2>
      </header>
      {error.length > 0 && <p>{error}</p>}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full md:max-w-[80%] md:min-w-[60%] items-center gap-y-5"
      >
        <div className="grid grid-cols-2 gap-5">
          <fieldset className="flex flex-col">
            <label>Ingrese el destino</label>
            <input
              onInput={(e) => setDestino((e.target as HTMLInputElement).value)}
              type="text"
              placeholder="Destino"
            />
          </fieldset>
          <fieldset className="flex flex-col">
            <label>Seleccione un avión</label>
            <select
              defaultValue={"0"}
              onChange={(e) => {
                setAvionId(parseInt(e.target.value));
              }}
            >
              <option value="0" disabled>
                --seleccione--
              </option>
              {datos?.aviones.map((avion) => (
                <option value={avion.AVION_ID} key={avion.AVION_ID}>
                  Avion {avion.AVION_ID}, {avion.TIPO_AVION}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset className="flex flex-col">
            <label>Seleccione un aeropuero de salida</label>
            <select
              defaultValue={"0"}
              onChange={(e) => {
                setAeroSalidaId(parseInt(e.target.value));
              }}
            >
              <option value="0" disabled>
                --seleccione--
              </option>
              {datos?.aeropuertos.map((aeropuerto) => (
                <option
                  value={aeropuerto.AEROPUERTO_ID}
                  key={aeropuerto.AEROPUERTO_ID}
                >
                  {aeropuerto.NOMBRE}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="flex flex-col">
            <label>Seleccione un aeropuero de llegada</label>
            <select
              defaultValue={"0"}
              onChange={(e) => {
                setAeroLlegadaId(parseInt(e.target.value));
              }}
            >
              <option value="0" disabled>
                --seleccione--
              </option>
              {datos?.aeropuertos.map((aeropuerto) => (
                <option
                  value={aeropuerto.AEROPUERTO_ID}
                  key={aeropuerto.AEROPUERTO_ID}
                >
                  {aeropuerto.NOMBRE}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset>
            <label>Ingrese la fecha de salida</label>
            <input
              onChange={(e) =>
                setFechaSalida((e.target as HTMLInputElement).value)
              }
              type="date"
              className="w-full"
            />
          </fieldset>
          <fieldset>
            <label>Ingrese la fecha de llega</label>
            <input
              onChange={(e) =>
                setFechaLlegada((e.target as HTMLInputElement).value)
              }
              type="date"
              className="w-full"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          value={loading ? "Agregando..." : "Agregar vuelo"}
          className="p-2 text-center bg-blue-500 text-white rounded-lg hover:cursor-pointer hover:bg-blue-600 transition-all"
        />
      </form>
    </>
  );
};

export default CrearVuelosForm;
