"use client";
import { useParams } from "next/navigation";
import {
  childrenType,
  useUpdateAzafataContext,
} from "../../_context/update-azafata.context";
import { useEffect } from "react";

const Layout = ({ children }: childrenType) => {
  const { getInfo } = useUpdateAzafataContext();
  const params = useParams();

  useEffect(() => {
    getInfo(Number(params.azafata_id));
  }, []);
  return <>{children}</>;
};

export default Layout;
