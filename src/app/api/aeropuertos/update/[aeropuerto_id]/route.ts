import { Aeropuerto, aeropuerto } from "../../entidad";
import { NextResponse } from "next/server";

type Params = {
  params: {
    aeropuerto_id: string;
  };
};

export async function PUT(request: Request, { params }: Params) {
  const { aeropuerto_id } = params;
  const body = await request.json();
  const aeropuerto = new Aeropuerto();
  const response = await aeropuerto.update(+aeropuerto_id, body);
  return NextResponse.json(response);
}
