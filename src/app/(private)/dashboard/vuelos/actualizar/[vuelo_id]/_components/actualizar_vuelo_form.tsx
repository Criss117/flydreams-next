"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getHour } from "@/utilities";
import { Datos, vuelo_info } from "@/utilities/types/vuelo_info";
import InputVuelos from "../../../_components/input_vuelos";
import SelectAeropuerto from "../../../_components/select_aeropuerto";
import { getDate } from "../../../../../../../utilities/funtions/formatDate";

export type ActualizarVueloProps = {
  datos: Datos;
  vueloInfo: vuelo_info;
};

const ActualizarVueloForm = ({ datos, vueloInfo }: ActualizarVueloProps) => {
  const [destino, setDestino] = useState<string>();
  const [avionId, setAvionId] = useState<number>();
  const [aeroSalidaId, setAeroSalidaId] = useState<number>();
  const [aeroLlegadaId, setAeroLlegadaId] = useState<number>();
  const [fechaSalida, setFechaSalida] = useState<string>();
  const [fechallegada, setFechaLlegada] = useState<string>();
  const [horaSalida, setHoraSalida] = useState<string>();
  const [horallegada, setHoraLlegada] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const startStates = async () => {
      setDestino(vueloInfo.DESTINO);
      setAvionId(vueloInfo.AVION_ID);
      setAeroSalidaId(vueloInfo.AEROPUERTO_SALIDA_ID);
      setAeroLlegadaId(vueloInfo.AEROPUERTO_LLEGADA_ID);
      setFechaSalida(getDate(vueloInfo.FECHA_SALIDA));
      setFechaLlegada(getDate(vueloInfo.FECHA_LLEGADA));
      setHoraLlegada(getHour(vueloInfo.FECHA_LLEGADA));
      setHoraSalida(getHour(vueloInfo.FECHA_SALIDA));
    };
    startStates();
  }, [vueloInfo]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (
    //   destino === "" ||
    //   avionId <= 0 ||
    //   aeroSalidaId <= 0 ||
    //   aeroLlegadaId <= 0 ||
    //   fechaSalida === "" ||
    //   fechallegada === "" ||
    //   horaSalida === "" ||
    //   horallegada === ""
    // ) {
    //   setError("Faltan datos");
    //   return;
    // }

    if (aeroLlegadaId === aeroSalidaId) {
      setError("Faltan de datos");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_FRONT_URL}/vuelos/update/${vueloInfo.VUELO_ID}`,
        {
          method: "PUT",
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
      if (!response.response) {
        setError("Hubo un error");
        setLoading(false);
        return;
      }
      push(`/dashboard/vuelos/${vueloInfo.VUELO_ID}`);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <header className="flex flex-col text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Agregar vuelo</h2>
      </header>
      {error != undefined && error.length > 0 && <p>{error}</p>}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full md:max-w-[80%] md:min-w-[60%] items-center gap-y-5"
      >
        <div className="grid grid-cols-2 gap-5">
          {destino != undefined && (
            <InputVuelos
              setState={setDestino}
              label="Ingrese el destino"
              type="text"
              placeholder="Destino"
              defaultValue={destino}
            />
          )}
          {avionId != undefined && (
            <fieldset className="flex flex-col">
              <label>Seleccione un avión</label>
              <select
                defaultValue={avionId}
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
          )}
          {aeroLlegadaId != undefined && (
            <SelectAeropuerto
              setState={setAeroSalidaId}
              label="Seleccione un aeropuero de salida"
              datos={datos}
              defaultValue={aeroSalidaId}
            />
          )}
          {aeroLlegadaId != undefined && (
            <SelectAeropuerto
              setState={setAeroLlegadaId}
              label="Seleccione un aeropuero de llegada"
              datos={datos}
              defaultValue={aeroLlegadaId}
            />
          )}
          {fechaSalida != undefined && (
            <InputVuelos
              setState={setFechaSalida}
              label="Ingrese la fecha de salida"
              type="date"
              defaultValue={fechaSalida}
            />
          )}
          {fechallegada != undefined && (
            <InputVuelos
              setState={setFechaLlegada}
              label="Ingrese la fecha de llega"
              type="date"
              defaultValue={fechallegada}
            />
          )}
          {horaSalida != undefined && (
            <InputVuelos
              setState={setHoraSalida}
              label="Ingrese la hora de salida"
              type="time"
              defaultValue={horaSalida}
            />
          )}
          {horallegada != undefined && (
            <InputVuelos
              setState={setHoraLlegada}
              label="Ingrese la hora de llegada"
              type="time"
              defaultValue={horallegada}
            />
          )}
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

export default ActualizarVueloForm;
