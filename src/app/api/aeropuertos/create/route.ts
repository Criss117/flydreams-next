import { NextResponse } from "next/server";
import { Aeropuerto } from "../entidad";

export async function POST(request: Request) {
  const body = await request.json();
  const aeropuerto = new Aeropuerto();
  const response = await aeropuerto.create(body);
  return NextResponse.json(response);
}
