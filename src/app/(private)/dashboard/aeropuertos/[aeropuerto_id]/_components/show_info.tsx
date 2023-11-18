import { aeropuertoInfo } from "@/utilities/types";
import VueloCard from "../../../_components/vuelo_card";

const ShowInfo = ({
  aeropuertoInfo,
}: {
  aeropuertoInfo: aeropuertoInfo | undefined;
}) => {
  return (
    <>
      <header className="bg-blue-50 mt-5 p-2 flex justify-around items-center">
        <h2 className="text-3xl font-bold">
          {aeropuertoInfo?.aeropuerto.NOMBRE}
        </h2>
        <p>
          {aeropuertoInfo?.aeropuerto.PAIS}, {aeropuertoInfo?.aeropuerto.CIUDAD}
        </p>
      </header>

      <article className="mt-5 p-2">
        <h3 className="text-2xl">Vuelos que salen</h3>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {aeropuertoInfo?.salida.length === 0 ? (
            <p>No hay vuelos</p>
          ) : (
            aeropuertoInfo?.salida.map((vuelo) => (
              <VueloCard key={vuelo.VUELO_ID} vuelo={vuelo} />
            ))
          )}
        </div>
      </article>

      <article className="mt-10 p-2">
        <h3 className="text-2xl">Vuelos que llegan</h3>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {aeropuertoInfo?.llegada.length === 0 ? (
            <p>No hay vuelos</p>
          ) : (
            aeropuertoInfo?.llegada.map((vuelo) => (
              <VueloCard key={vuelo.VUELO_ID} vuelo={vuelo} />
            ))
          )}
        </div>
      </article>
    </>
  );
};

export default ShowInfo;
