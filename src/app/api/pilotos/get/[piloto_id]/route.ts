import { NextResponse } from "next/server";
import { Piloto } from "../../entity/piloto.entity";

type params = {
  params: {
    piloto_id: string;
  };
};

export async function GET(request: Request, { params }: params) {
  const piloto = new Piloto();
  const response = await piloto.getOne(+params.piloto_id);
  return NextResponse.json(response);
}
