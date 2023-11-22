import { NextResponse } from "next/server";
import { Vuelo } from "../../entidad";

export async function GET() {
  const vuelo = new Vuelo();
  const response = await vuelo.getAll();
  return NextResponse.json(response);
}
