import { vuelo_info } from "@/utilities/types/vuelo_info";
import VuelosTableTBody from "./vuelos_table_tbody";
const VuelosTable = ({ vuelos }: { vuelos: vuelo_info[] }) => {
  return (
    <table className="mt-10">
      <thead className="border-b-2 border-black">
        <tr>
          <th className="px-2">Destino</th>
          <th className="px-2">Aer. Salida</th>
          <th className="px-2">Aer. Llegada</th>
          <th className="px-2">Fecha Salida</th>
          <th className="px-2">Fecha Llegada</th>
          <th className="px-2">Editar</th>
          <th className="px-2">Eliminar</th>
          <th className="px-2">Asignar azafatas</th>
        </tr>
      </thead>
      <VuelosTableTBody vuelos={vuelos} />
    </table>
  );
};

export default VuelosTable;
