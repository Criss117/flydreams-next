"use client";
import { AzafataType } from "@/app/api/azafata/entity/azafata.entity";
import { PasajeroType } from "@/app/api/pasajeros/entity/pasajeros.entity";
import { Dispatch, SetStateAction } from "react";
import { Pasajero } from "../../../../../../api/pasajeros/entity/pasajeros.entity";

type Params = {
  pasajero: PasajeroType;
  setPasajero: Dispatch<SetStateAction<PasajeroType>>;
  error: string;
};

const CrearPasajeroForm = ({ pasajero, setPasajero, error }: Params) => {
  return (
    <>
      <header className="flex flex-col text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Crear Pasajero</h2>
      </header>
      {error.length > 0 && (
        <p className="p-2 bg-red-300 text-black rounded-lg">{error}</p>
      )}
      <form className="flex flex-col w-full md:max-w-[80%] md:min-w-[60%] items-center gap-y-5">
        <fieldset className="flex flex-col">
          <label>Costo</label>
          <input
            onChange={(e) =>
              setPasajero({
                ...pasajero,
                costo: parseInt(e.target.value),
              })
            }
            type="number"
            className="w-[20rem]"
            placeholder="Costo"
            defaultValue={pasajero.costo}
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <label>Destino</label>
          <input
            onChange={(e) =>
              setPasajero({
                ...pasajero,
                destino: e.target.value,
              })
            }
            type="text"
            className="w-[20rem]"
            placeholder="Destino"
            defaultValue={pasajero.destino}
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <label>Peso del equipaje en kg</label>
          <input
            onChange={(e) =>
              setPasajero({
                ...pasajero,
                peso: +e.target.value,
              })
            }
            type="number"
            className="w-[20rem]"
            placeholder="Peso"
            defaultValue={pasajero.peso}
          />
        </fieldset>
      </form>
    </>
  );
};

export default CrearPasajeroForm;
