"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { childrenType } from "../../../azafatas/crear/_context/create-azafata.context";
import { PersonaType } from "@/app/api/persona/entidad/persona.entidad";
import { PasajeroType } from "@/app/api/pasajeros/entity/pasajeros.entity";
import { compareObj } from "@/utilities/funtions/compareObj";
import { useRouter } from "next/navigation";

export interface IPasajeroFormContext {
  persona: PersonaType;
  setPersona: Dispatch<SetStateAction<PersonaType>>;
  pasajero: PasajeroType;
  setPasajero: Dispatch<SetStateAction<PasajeroType>>;
  onSubmit: () => void;
  error: string;
}

const CreatePasajeroContext = createContext<IPasajeroFormContext | null>(null);

export const useCreatePasajeroContext = () => {
  const conext = useContext(CreatePasajeroContext);
  if (!conext)
    throw new Error("useCreateContext must be used within a provider");
  return conext;
};

const CreatePasajeroProvider = ({ children }: childrenType) => {
  const personaDefault = {
    nombre: "",
    apellido: "",
    fecha_nac: "",
    pais_nac: "",
    ciudad_nac: "",
    genero_id: 0,
    numero_identificacion: 0,
  };
  const pasajeroDefault: PasajeroType = {
    companion_id: 0,
    costo: 0,
    destino: "",
    peso: 0,
  };
  const [persona, setPersona] = useState<PersonaType>(personaDefault);
  const [pasajero, setPasajero] = useState<PasajeroType>(pasajeroDefault);
  const { push } = useRouter();
  const [error, setError] = useState<string>("");

  const onSubmit = async () => {
    const url = process.env.NEXT_PUBLIC_API_FRONT_URL + "/pasajeros/create";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ persona, pasajero }),
    };

    const res = await fetch(url, options);
    const data = await res.json();
    if (data.response) {
      push(`/dashboard/p/pasajeros/asignar-vuelo/${data.response}`);
    }
  };

  return (
    <CreatePasajeroContext.Provider
      value={{ persona, setPersona, pasajero, setPasajero, onSubmit, error }}
    >
      {children}
    </CreatePasajeroContext.Provider>
  );
};

export default CreatePasajeroProvider;
