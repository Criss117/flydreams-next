import { NextResponse } from "next/server";
import { Vuelo } from "../../entidad";

type Params = {
  params: {
    vuelo_id: string;
  };
};

export async function PUT(request: Request, params: Params) {
  const vuelo = new Vuelo();
  const response = await vuelo.update(
    +params.params.vuelo_id,
    await request.json()
  );
  return NextResponse.json(response);
}
