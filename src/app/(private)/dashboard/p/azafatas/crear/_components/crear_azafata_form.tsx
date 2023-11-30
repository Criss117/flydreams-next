"use client";
import { AzafataType } from "@/app/api/azafata/entity/azafata.entity";
import { Dispatch, SetStateAction } from "react";

type Params = {
  azafata: AzafataType;
  setAzafata: Dispatch<SetStateAction<AzafataType>>;
  error: string;
};

const CrearAzafataForm = ({ azafata, setAzafata, error }: Params) => {
  return (
    <>
      <header className="flex flex-col text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Actualizar Azafata</h2>
      </header>
      {error.length > 0 && (
        <p className="p-2 bg-red-300 text-black rounded-lg">{error}</p>
      )}
      <form className="flex flex-col w-full md:max-w-[80%] md:min-w-[60%] items-center gap-y-5">
        <fieldset className="flex flex-col">
          <label>Vuelos Abordados</label>
          <input
            onChange={(e) =>
              setAzafata({
                ...azafata,
                vuelos_abordados: parseInt(e.target.value),
              })
            }
            type="number"
            className="w-[20rem]"
            placeholder="Vuelos abordados"
            defaultValue={azafata.vuelos_abordados}
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <label>Idioma Natal</label>
          <input
            onChange={(e) =>
              setAzafata({
                ...azafata,
                idioma_natal: e.target.value,
              })
            }
            type="text"
            className="w-[20rem]"
            placeholder="Idioma Natal"
            defaultValue={azafata.idioma_natal ?? ""}
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <label>Idioma Secundario</label>
          <input
            onChange={(e) =>
              setAzafata({
                ...azafata,
                idioma_secundario: e.target.value,
              })
            }
            type="text"
            className="w-[20rem]"
            placeholder="Idioma Secundario"
            defaultValue={azafata.idioma_secundario ?? ""}
          />
        </fieldset>
      </form>
    </>
  );
};

export default CrearAzafataForm;
