import { NextResponse } from "next/server";
import { Vuelo, vueloType } from "../entidad";
export async function GET() {
  const vuelo = new Vuelo();
  const response = await vuelo.getInfoToCreate();
  //connection.close();
  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const body: vueloType = await request.json();
  const vuelo = new Vuelo();
  const response = await vuelo.create(body);
  return NextResponse.json(response);
}
