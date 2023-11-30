import { NextResponse } from "next/server";
import { Vuelo } from "../../entity";

type Params = {
  params: {
    vuelo_id: string;
  };
};

export async function PUT(request: Request, { params }: Params) {
  const { vuelo_id } = params;
  const vuelo = new Vuelo();
  const body = await request.json();
  const response = await vuelo.update(+vuelo_id, body);
  return NextResponse.json(response);
}
