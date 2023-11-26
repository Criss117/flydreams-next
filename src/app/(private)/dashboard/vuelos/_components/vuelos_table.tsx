import { vuelo_info } from "@/utilities/types/vuelo_info";
import VuelosTableTBody from "./vuelos_table_tbody";
const VuelosTable = ({ vuelos }: { vuelos: vuelo_info[] }) => {
  return (
    <table className="mt-10">
      <thead className="border-b-2 border-black">
        <tr>
          <th>Destino</th>
          <th>Aer. Salida</th>
          <th>Aer. Llegada</th>
          <th>Fecha Salida</th>
          <th>Fecha Llegada</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <VuelosTableTBody vuelos={vuelos} />
    </table>
  );
};

export default VuelosTable;
