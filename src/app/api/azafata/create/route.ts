import { NextResponse } from "next/server";
import { Azafata } from "../entity/azafata.entity";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const azafata = new Azafata();
  const response = await azafata.createAzafata(body.persona, body.azafata);
  return NextResponse.json(response);
}
