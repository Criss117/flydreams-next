import { AzafataInfo } from "@/utilities";
import AzafatasTableTBody from "./azafatas_table_tbody";

const AzafataTable = ({ azafatas }: { azafatas: AzafataInfo[] }) => {
  return (
    <table className="mt-10">
      <thead className="border-b-2 border-black">
        <tr>
          <th className="px-2">CC.</th>
          <th className="px-2">Nombres</th>
          <th className="px-2">Pais</th>
          <th className="px-2">Ciudad</th>
          <th className="px-2">Vuelos</th>
          <th className="px-2">Idioma Natal</th>
          <th className="px-2">Idioma Secundario</th>
          <th className="px-2">Editar</th>
          <th className="px-2">Eliminar</th>
        </tr>
      </thead>
      <AzafatasTableTBody azafatas={azafatas} />
    </table>
  );
};

export default AzafataTable;
