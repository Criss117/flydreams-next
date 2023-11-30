import { NextResponse } from "next/server";
import { Azafata } from "../../entity/azafata.entity";

type Params = {
  params: {
    azafata_id: string;
  };
};

export async function DELETE(request: Request, { params }: Params) {
  const azafata = new Azafata();
  const response = await azafata.delete(+params.azafata_id);
  return NextResponse.json(response);
}
