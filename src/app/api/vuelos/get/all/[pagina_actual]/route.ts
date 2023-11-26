import { NextResponse } from "next/server";
import { Vuelo } from "../../../entidad";

type params = {
  params: {
    pagina_actual: string;
  };
};

export async function GET(request: Request, { params }: params) {
  const vuelo = new Vuelo();
  const response = await vuelo.getAll(+params.pagina_actual);
  return NextResponse.json(response);
}
