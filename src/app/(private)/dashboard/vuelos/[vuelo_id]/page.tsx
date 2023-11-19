"use client";
const page = ({ params }: { params: { vuelo_id: string } }) => {
  return <div>{params.vuelo_id}</div>;
};

export default page;
