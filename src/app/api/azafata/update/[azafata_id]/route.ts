import { NextResponse } from "next/server";
import { Azafata } from "../../entity/azafata.entity";

type Params = {
  params: {
    azafata_id: string;
  };
};
export async function PUT(request: Request, { params }: Params) {
  const azafata = new Azafata();
  const body = await request.json();
  const response = await azafata.update(body.persona, body.azafata);
  return NextResponse.json(response);
}
