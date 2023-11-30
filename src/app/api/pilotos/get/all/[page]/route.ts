import { NextResponse } from "next/server";
import { Piloto } from "../../../entity/piloto.entity";

type params = {
  params: {
    page: string;
  };
};

export async function GET(request: Request, { params }: params) {
  const piloto = new Piloto();
  const response = await piloto.getAll(+params.page);
  return NextResponse.json(response);
}
