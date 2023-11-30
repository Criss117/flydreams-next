import { NextResponse } from "next/server";
import { Azafata } from "../../../entity/azafata.entity";

type Params = {
  params: {
    vuelo_id: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  const azafata = new Azafata();
  const response = await azafata.getByVuelo(+params.vuelo_id);
  return NextResponse.json(response);
}
