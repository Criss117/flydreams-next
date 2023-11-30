import { NextResponse } from "next/server";
import { Azafata } from "../entity/azafata.entity";

export async function POST(request: Request) {
  const body = await request.json();
  const { vuelo_id, azafata_id } = body;
  if (!vuelo_id || !azafata_id) {
    return NextResponse.json({ msg: "bad request" });
  }
  const azafata = new Azafata();
  const response = await azafata.assignStewardess(+vuelo_id, +azafata_id);
  return NextResponse.json(response);
}
