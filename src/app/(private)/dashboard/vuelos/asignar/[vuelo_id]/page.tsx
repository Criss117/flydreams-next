"use client";
import { useEffect, useState } from "react";
import { vuelo_info } from "@/utilities/types/vuelo_info";
import Link from "next/link";
import ShowVueloInfo from "./_components/show_vuelo_info";
import { vuelo } from "../../../../../../utilities/types/vuelo";

const AsignarAzafata = ({ params }: { params: { vuelo_id: string } }) => {
  const [vuelo, setVuelo] = useState<vuelo_info>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getInfoToUpdate = async () => {
      const url =
        process.env.NEXT_PUBLIC_API_FRONT_URL +
        "/vuelos/get/one/" +
        params.vuelo_id;
      const res = await fetch(url);
      const data = await res.json();
      setVuelo(data.vuelo);
    };
    getInfoToUpdate();
    setLoading(false);
  }, [params.vuelo_id]);
  return (
    <main>
      <div className="mt-2 mx-2 flex justify-start">
        <Link
          href={"/dashboard/vuelos/1"}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Atras
        </Link>
      </div>
      {vuelo != undefined && <ShowVueloInfo vuelo={vuelo} />}
    </main>
  );
};

export default AsignarAzafata;
