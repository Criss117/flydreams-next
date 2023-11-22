import { NextResponse } from "next/server";
import { Aeropuerto } from "../../entidad";

export async function GET() {
  const aeropuerto = new Aeropuerto();
  const response = await aeropuerto.getAll();
  return NextResponse.json(response);
}
