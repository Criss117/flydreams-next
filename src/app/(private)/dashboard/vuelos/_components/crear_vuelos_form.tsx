"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Datos } from "@/utilities/types/vuelo_info";
import InputVuelos from "./input_vuelos";
import SelectAeropuerto from "./select_aeropuerto";
import { ERRORS_DB } from "@/utilities";

const CrearVuelosForm = ({ datos }: { datos: Datos | undefined }) => {
  const [destino, setDestino] = useState("");
  const [avionId, setAvionId] = useState(-1);
  const [aeroSalidaId, setAeroSalidaId] = useState(-1);
  const [aeroLlegadaId, setAeroLlegadaId] = useState(-1);
  const [fechaSalida, setFechaSalida] = useState("");
  const [fechallegada, setFechaLlegada] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const [horallegada, setHoraLlegada] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      destino === "" ||
      avionId <= 0 ||
      aeroSalidaId <= 0 ||
      aeroLlegadaId <= 0 ||
      fechaSalida === "" ||
      fechallegada === "" ||
      horaSalida === "" ||
      horallegada === ""
    ) {
      setError("Faltan datos");
      return;
    }

    if (aeroLlegadaId === aeroSalidaId) {
      setError("Faltan de datos");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_FRONT_URL}/vuelos/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destino,
            avion_id: avionId,
            aeropuerto_salida_id: aeroSalidaId,
            aeropuerto_llegada_id: aeroLlegadaId,
            fecha_salida: fechaSalida + " " + horaSalida,
            fecha_llegada: fechallegada + " " + horallegada,
          }),
        }
      ).then((res) => res.json());
      if (response.errorNum) {
        setError(
          ERRORS_DB.find((error) => error.errorNum === response.errorNum)
            ?.mgs || "Error al crear el vuelo"
        );
        setLoading(false);
        return;
      }
      push(`/dashboard/vuelos/${response.response}`);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <header className="flex flex-col text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Agregar vuelo</h2>
      </header>
      {error.length > 0 && (
        <p className="p-2 bg-red-300 text-black rounded-lg">{error}</p>
      )}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full md:max-w-[80%] md:min-w-[60%] items-center gap-y-5"
      >
        <div className="grid grid-cols-2 gap-5">
          <InputVuelos
            setState={setDestino}
            label="Ingrese el destino"
            type="text"
            placeholder="Destino"
          />
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

          <SelectAeropuerto
            setState={setAeroSalidaId}
            label="Seleccione un aeropuero de salida"
            datos={datos}
          />
          <SelectAeropuerto
            setState={setAeroLlegadaId}
            label="Seleccione un aeropuero de llegada"
            datos={datos}
          />

          <InputVuelos
            setState={setFechaSalida}
            label="Ingrese la fecha de salida"
            type="date"
          />
          <InputVuelos
            setState={setFechaLlegada}
            label="Ingrese la fecha de llega"
            type="date"
          />
          <InputVuelos
            setState={setHoraSalida}
            label="Ingrese la hora de salida"
            type="time"
          />
          <InputVuelos
            setState={setHoraLlegada}
            label="Ingrese la hora de llegada"
            type="time"
          />
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
