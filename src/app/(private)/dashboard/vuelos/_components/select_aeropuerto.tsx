import { Datos } from "@/utilities/types/vuelo_info";
import { SetStateAction } from "react";

const SelectAeropuerto = ({
  setState,
  label,
  datos,
  defaultValue = 0,
}: {
  setState(value: SetStateAction<any>): void;
  label: string;
  datos: Datos | undefined;
  defaultValue?: number;
}) => {
  return (
    <fieldset className="flex flex-col">
      <label>{label}</label>
      <select
        defaultValue={defaultValue}
        onChange={(e) => {
          setState(parseInt(e.target.value));
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
  );
};

export default SelectAeropuerto;
