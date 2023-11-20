import { NextResponse } from "next/server";
import { getConnection } from "../../repository";
import { Aeropuerto } from "../entidad";

export async function POST(request: Request) {
  const body = await request.json();
  const connection = await getConnection();
  const aeropuerto = new Aeropuerto(connection);
  await aeropuerto.create(body);
  connection.close();
  return NextResponse.json({ message: "ok" });
}
