import { NextResponse } from "next/server";
import { Azafata } from "../../../entity/azafata.entity";

type params = {
  params: {
    page: string;
  };
};

export async function GET(request: Request, { params }: params) {
  const azafata = new Azafata();
  const response = await azafata.getAll(+params.page);
  return NextResponse.json(response);
}
