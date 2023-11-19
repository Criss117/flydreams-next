import { NextResponse } from "next/server";
import { getConnection } from "../../repository";
import { Vuelo } from "../entidad";

export async function GET() {
  const connection = await getConnection();
  const vuelo = new Vuelo(connection);
  const response = await vuelo.getInfoToCreate();
  //connection.close();
  return NextResponse.json(response);
}
