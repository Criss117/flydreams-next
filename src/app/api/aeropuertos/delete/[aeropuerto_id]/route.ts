import { NextResponse } from "next/server";
import { Aeropuerto } from "../../entidad";

type params = {
  params: {
    aeropuerto_id: string;
  };
};

export async function DELETE(request: Request, { params }: params) {
  const { aeropuerto_id } = params;
  const aeropuerto = new Aeropuerto();
  const response = await aeropuerto.delete(+aeropuerto_id);
  return NextResponse.json(response);
}
