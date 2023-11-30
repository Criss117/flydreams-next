"use client";

import { AzafataType } from "@/app/api/azafata/entity/azafata.entity";
import { PersonaType } from "@/app/api/persona/entidad/persona.entidad";
import { compareObj } from "@/utilities/funtions/compareObj";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type childrenType = {
  children: React.ReactNode;
};

export interface IAzafataFormContext {
  persona: PersonaType;
  setPersona: Dispatch<SetStateAction<PersonaType>>;
  azafata: AzafataType;
  setAzafata: Dispatch<SetStateAction<AzafataType>>;
  onSubmit: () => void;
  error: string;
}

const CreateAzafataContext = createContext<IAzafataFormContext | null>(null);

export const useCreateAzafataContext = () => {
  const conext = useContext(CreateAzafataContext);
  if (!conext)
    throw new Error("useCreateContext must be used within a provider");
  return conext;
};

const CreateAzafataProvider = ({ children }: childrenType) => {
  const personaDefault = {
    nombre: "",
    apellido: "",
    fecha_nac: "",
    pais_nac: "",
    ciudad_nac: "",
    genero_id: 0,
    numero_identificacion: 0,
  };
  const azafataDefault = {
    idioma_natal: "",
    idioma_secundario: "",
    vuelos_abordados: 0,
  };
  const [persona, setPersona] = useState<PersonaType>(personaDefault);
  const [azafata, setAzafata] = useState<AzafataType>(azafataDefault);
  const { push } = useRouter();
  const [error, setError] = useState<string>("");

  const onSubmit = async () => {
    if (!compareObj(persona, azafata)) {
      setError("Todos los campos son obligatorios");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    const url = process.env.NEXT_PUBLIC_API_FRONT_URL + "/azafata/create";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ persona, azafata }),
    };

    const res = await fetch(url, options);
    const data = await res.json();
    if (data.response) {
      push("/dashboard/p/azafatas/1");
    }
  };

  return (
    <CreateAzafataContext.Provider
      value={{ persona, setPersona, azafata, setAzafata, onSubmit, error }}
    >
      {children}
    </CreateAzafataContext.Provider>
  );
};

export default CreateAzafataProvider;
