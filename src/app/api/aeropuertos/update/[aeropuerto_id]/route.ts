import { getConnection } from "@/app/api/repository";
import { Aeropuerto, aeropuerto } from "../../entidad";
import { NextResponse } from "next/server";

type params = {
  params: {
    aeropuerto_id: string;
  };
};

export async function PUT(request: Request, { params }: params) {
  const { aeropuerto_id } = params;
  const body = await request.json();
  const newAeropuerto: aeropuerto = body;

  const connection = await getConnection();
  const aeropuerto = new Aeropuerto(connection);
  const response = await aeropuerto.update(+aeropuerto_id, newAeropuerto);
  return NextResponse.json(response);
}
