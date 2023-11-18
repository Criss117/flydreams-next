// import { NextResponse } from "next/server";
// import oracleDB from "oracledb";

// export async function GET(request: Request) {
//   oracleDB.outFormat = oracleDB.OUT_FORMAT_OBJECT;

//   const connection = await oracleDB.getConnection({
//     user: "aerolinea",
//     password: "oracle",
//     connectString: "localhost/xe",
//   });

//   const typeClass = await connection.getDbObjectClass("PRUEBA.AEROPUERTO_TYPE");

//   const result = await connection.execute(
//     `
//     DECLARE
//     BEGIN
//     prueba.procedur(:infos);
//     END;`,
//     {
//       //@ts-ignore
//       infos: {
//         dir: oracleDB.BIND_OUT,
//         type: typeClass,
//       },
//     }
//   );
//   console.log(result);

//   await connection.close();
//   return NextResponse.json(result);
// }
