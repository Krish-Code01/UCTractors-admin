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

    const {
      name,
      price,
      companyId,
      tyre,
      condition,
      model,
      images,
      isFeatured,
      isArchived,
    } = body;
    console.log(body);
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!companyId) {
      return new NextResponse("Company id is required", { status: 400 });
    }

    if (!model) {
      return new NextResponse("Model year is required", { status: 400 });
    }

    if (!tyre) {
      return new NextResponse("Tyre Condition is required", { status: 400 });
    }

    if (!condition) {
      return new NextResponse("Tractor Condition is required", { status: 400 });
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
    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        companyId,
        model,
        tyre,
        condition,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId") || undefined;
    const tyre = searchParams.get("tyre") || undefined;
    const condition = searchParams.get("condition") || undefined;
    const model = searchParams.get("model") || undefined;

    var extractedNumber = 0;
    if (model) {
      extractedNumber = parseInt(model.split(" ")[2]);
    }
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isFeatured = searchParams.get("isFeatured");
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        companyId,
        tyre: tyre ? tyre : undefined,
        condition: condition ? condition : undefined,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
        model: extractedNumber
          ? {
              gte: currentYear - extractedNumber, // Assuming modelYear is the number of years ago
            }
          : undefined,
      },
      include: {
        images: true,
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
