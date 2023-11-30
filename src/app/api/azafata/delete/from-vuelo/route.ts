import { NextResponse } from "next/server";
import { Azafata } from "../../entity/azafata.entity";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const vueloId = searchParams.get("vuelo_id");
  const azafataId = searchParams.get("azafata_id");
  if (!vueloId || !azafataId) {
    return NextResponse.json({ msg: "bad request" });
  }
  const azafata = new Azafata();
  const response = await azafata.deleteFromVuelo(+vueloId, +azafataId);
  return NextResponse.json(response);
}
