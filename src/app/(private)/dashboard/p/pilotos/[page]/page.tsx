"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PilotoInfo } from "@/utilities";
import PilotosTable from "../_components/pilotos_table";

const Pilotos = ({ params }: { params: { page: string } }) => {
  const { page } = params;
  const [pilotos, setPilotos] = useState<PilotoInfo[]>([]);
  const { push } = useRouter();
  useEffect(() => {
    const getPilotos = async () => {
      const url =
        process.env.NEXT_PUBLIC_API_FRONT_URL + "/pilotos/get/all/" + page;
      const res = await fetch(url);
      const data = await res.json();
      if (data.code === "NJS-105" || data.pilotos.length === 0) {
        push("/dashboard/pilotos/1");
        return;
      }
      setPilotos(data.pilotos);
      return;
    };
    getPilotos();
  }, [page, push]);
  return (
    <main>
      <div className="mt-2 mx-2 flex justify-around">
        <Link
          href={"/dashboard/home"}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Home
        </Link>
        <Link
          href={"/dashboard/p/azafatas/crear/azafata"}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Agregar Azafata
        </Link>
      </div>
      <section className="flex justify-center">
        <PilotosTable pilotos={pilotos} />
      </section>
    </main>
  );
};

export default Pilotos;
