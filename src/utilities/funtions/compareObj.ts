import { AzafataType } from "@/app/api/azafata/entity/azafata.entity";
import { PersonaType } from "@/app/api/persona/entidad/persona.entidad";

export const compareObj = (obj1: PersonaType, obj2: AzafataType) => {
  if (
    obj1.apellido === "" ||
    obj1.ciudad_nac === "" ||
    obj1.fecha_nac === "" ||
    obj1.genero_id === 0 ||
    obj1.pais_nac === "" ||
    obj1.nombre === "" ||
    obj1.numero_identificacion === 0
  ) {
    return false;
  }
  if (obj2.idioma_natal === "" || obj2.idioma_secundario === "") {
    return false;
  }
  return true;
};
