import { NextResponse } from "next/server";
import { Pasajero } from "../../entity/pasajeros.entity";

type params = {
  params: {
    pasajero_id: string;
  };
};

export async function GET(request: Request, { params }: params) {
  const pasajero = new Pasajero();
  const response = await pasajero.getOne(+params.pasajero_id);
  return NextResponse.json(response);
}
