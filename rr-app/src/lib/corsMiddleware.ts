import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [`${process.env.NEXT_PUBLIC_URL}`, "http://localhost:3000"];

export const corsMiddleware = (req: NextRequest) => {
  const origin = req.headers.get("origin") || "";
  const response = NextResponse.next();

  // Set CORS headers
  response.headers.set("Access-Control-Allow-Origin", allowedOrigins.includes(origin || "") ? origin : "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
};
