"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AzafataInfo } from "@/utilities";
import AzafataTable from "../_components/azafatas_table";

const Azafatas = ({ params }: { params: { page: string } }) => {
  const { page } = params;
  const [azafatas, setAzafatas] = useState<AzafataInfo[]>([]);
  const { push } = useRouter();
  useEffect(() => {
    const getAzafatas = async () => {
      const url =
        process.env.NEXT_PUBLIC_API_FRONT_URL + "/azafata/get/all/" + page;
      const res = await fetch(url);
      const data = await res.json();
      if (data.code === "NJS-105" || data.azafatas.length === 0) {
        push("/dashboard/vuelos/1");
        return;
      }
      setAzafatas(data.azafatas);
      return;
    };
    getAzafatas();
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
        <AzafataTable azafatas={azafatas} />
      </section>
    </main>
  );
};

export default Azafatas;
