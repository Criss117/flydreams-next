import { NextResponse } from "next/server";
import { getConnection } from "../../repository";
import { Vuelo } from "../entidad";
import { VueloFront } from "@/utilities";

export async function GET() {
  const connection = await getConnection();
  const vuelo = new Vuelo(connection);
  const response = await vuelo.getInfoToCreate();
  //connection.close();
  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const body: VueloFront = await request.json();
  console.log(body);
  const connection = await getConnection();
  const vuelo = new Vuelo(connection);
  await vuelo.create(body);
  return NextResponse.json({ body, message: "ok" });
}
