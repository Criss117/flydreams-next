import { NextResponse } from "next/server";
import { Vuelo } from "../../../entidad";

type params = {
  params: {
    vuelo_id: string;
  };
};

export async function GET(request: Request, { params }: params) {
  const vuelo = new Vuelo();
  const response = await vuelo.getOne(+params.vuelo_id);
  return NextResponse.json(response);
}
