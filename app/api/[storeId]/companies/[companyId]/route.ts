import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    if (!params.companyId) {
      return new NextResponse("Company id is required", { status: 400 });
    }

    const company = await prismadb.company.findUnique({
      where: {
        id: params.companyId,
      },
      include: {
        banner: true,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.log("[COMPANY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { companyId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.companyId) {
      return new NextResponse("Company id is required", { status: 400 });
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

    const company = await prismadb.company.delete({
      where: {
        id: params.companyId,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.log("[COMPANY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { companyId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, bannerId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!bannerId) {
      return new NextResponse("Banner ID is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.companyId) {
      return new NextResponse("Company id is required", { status: 400 });
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

    const company = await prismadb.company.update({
      where: {
        id: params.companyId,
      },
      data: {
        name,
        bannerId,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.log("[COMPANY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
