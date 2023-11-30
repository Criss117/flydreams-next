import { AzafataInfo, PilotoInfo } from "@/utilities";
import PilotosTableTBody from "./pilotos_table_tbody";

const PilotosTable = ({ pilotos }: { pilotos: PilotoInfo[] }) => {
  return (
    <table className="mt-10">
      <thead className="border-b-2 border-black">
        <tr>
          <th className="px-2">CC.</th>
          <th className="px-2">Nombres</th>
          <th className="px-2">Pais</th>
          <th className="px-2">Ciudad</th>
          <th className="px-2">Vuelos</th>
          <th className="px-2">Licencia</th>
          <th className="px-2">Editar</th>
          <th className="px-2">Eliminar</th>
        </tr>
      </thead>
      <PilotosTableTBody pilotos={pilotos} />
    </table>
  );
};

export default PilotosTable;
