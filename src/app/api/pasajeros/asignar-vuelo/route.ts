import { NextResponse } from "next/server";
import { Pasajero } from "../entity/pasajeros.entity";

export async function POST(request: Request) {
  const body = await request.json();
  const pasajero = new Pasajero();
  const response = await pasajero.asignarVuelo(body.vuelo_id, body.pasajero_id);
  return NextResponse.json(response);
}
