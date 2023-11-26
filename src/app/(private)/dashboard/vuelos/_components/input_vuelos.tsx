import { SetStateAction } from "react";

const InputVuelos = ({
  setState,
  label,
  type,
  placeholder = "",
  defaultValue = "",
}: {
  setState(value: SetStateAction<any>): void;
  label: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
}) => {
  return (
    <fieldset>
      <label>{label}</label>
      <input
        onChange={(e) => setState((e.target as HTMLInputElement).value)}
        type={type}
        className="w-full"
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </fieldset>
  );
};

export default InputVuelos;
