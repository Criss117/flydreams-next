"use client";
import { PersonaType } from "@/app/api/persona/entidad/persona.entidad";
import { Dispatch, SetStateAction } from "react";

const CreatePersonaForm = ({
  tittle,
  persona,
  setPersona,
  error,
}: {
  tittle: string;
  persona: PersonaType;
  setPersona: Dispatch<SetStateAction<PersonaType>>;
  error: string;
}) => {
  return (
    <>
      <header className="flex flex-col text-center">
        <h2 className="text-3xl md:text-4xl font-bold">{tittle}</h2>
      </header>
      {error.length > 0 && (
        <p className="p-2 bg-red-300 text-black rounded-lg">{error}</p>
      )}
      <form className="flex flex-col w-full md:max-w-[80%] md:min-w-[60%] items-center gap-y-5">
        <div className="grid grid-cols-2 gap-5">
          <fieldset className="flex flex-col">
            <label>Nombre</label>
            <input
              onChange={(e) =>
                setPersona({
                  ...persona,
                  nombre: e.target.value,
                })
              }
              type="text"
              className="w-[20rem]"
              placeholder="Nombre"
              defaultValue={persona.nombre ?? ""}
            />
          </fieldset>
          <fieldset className="flex flex-col">
            <label>Apellido</label>
            <input
              onChange={(e) =>
                setPersona({
                  ...persona,
                  apellido: e.target.value,
                })
              }
              type="text"
              className="w-[20rem]"
              placeholder="Apellido"
              defaultValue={persona.apellido ?? ""}
            />
          </fieldset>
          <fieldset className="flex flex-col">
            <label>Numero de identificación</label>
            <input
              onChange={(e) =>
                setPersona({
                  ...persona,
                  numero_identificacion: +e.target.value,
                })
              }
              type="number"
              className="w-[20rem]"
              placeholder="Numero de identificación"
              defaultValue={persona.numero_identificacion ?? 0}
            />
          </fieldset>
          <fieldset className="flex flex-col">
            <label>Género</label>
            <select
              defaultValue={persona.genero_id ?? 0}
              onChange={(e) => {
                setPersona({ ...persona, genero_id: +e.target.value });
              }}
            >
              <option value="0" disabled>
                --seleccione--
              </option>
              <option value="1">Masculino</option>
              <option value="2">Femenino</option>
            </select>
          </fieldset>
          <fieldset className="flex flex-col">
            <label>Fecha de Nacimiento</label>
            <input
              onChange={(e) =>
                setPersona({
                  ...persona,
                  fecha_nac: e.target.value,
                })
              }
              type="date"
              className="w-[20rem]"
              placeholder="Fecha de Nacimiento"
              defaultValue={persona.fecha_nac ?? ""}
            />
          </fieldset>
          <fieldset className="flex flex-col">
            <label>Pais de Nacimiento</label>
            <input
              onChange={(e) =>
                setPersona({
                  ...persona,
                  pais_nac: e.target.value,
                })
              }
              type="text"
              className="w-[20rem]"
              placeholder="Pais de Nacimiento"
              defaultValue={persona.pais_nac ?? ""}
            />
          </fieldset>
          <fieldset className="flex flex-col">
            <label>Ciudad de Nacimiento</label>
            <input
              onChange={(e) =>
                setPersona({
                  ...persona,
                  ciudad_nac: e.target.value,
                })
              }
              type="text"
              className="w-[20rem]"
              placeholder="Ciudad de Nacimiento"
              defaultValue={persona.ciudad_nac ?? ""}
            />
          </fieldset>
        </div>
      </form>
    </>
  );
};

export default CreatePersonaForm;
