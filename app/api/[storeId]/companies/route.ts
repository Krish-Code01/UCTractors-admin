import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, bannerId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!bannerId) {
      return new NextResponse("Banner ID is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const company = await prismadb.company.create({
      data: {
        name,
        bannerId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.log("[COMPANIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const companies = await prismadb.company.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(companies);
  } catch (error) {
    console.log("[COMPANIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
