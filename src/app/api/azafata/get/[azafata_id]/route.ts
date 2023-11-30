import { NextResponse } from "next/server";
import { Azafata } from "../../entity/azafata.entity";

type params = {
  params: {
    azafata_id: string;
  };
};

export async function GET(request: Request, { params }: params) {
  const azafata = new Azafata();
  const response = await azafata.getOne(+params.azafata_id);
  return NextResponse.json(response);
}
