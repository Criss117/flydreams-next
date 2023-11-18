import { NextResponse } from "next/server";
import { getConnection } from "../../../repository";
import { Aeropuerto } from "../../entidad";

export async function GET() {
  const connection = await getConnection();
  const aeropuerto = new Aeropuerto(connection);
  const response = await aeropuerto.getAll();
  //connection.close();
  return NextResponse.json(response);
}
