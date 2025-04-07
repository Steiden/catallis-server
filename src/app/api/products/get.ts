import { prisma } from "@/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const products = await prisma.product.findMany({
			include: {
				category: true,
			},
		});

		return NextResponse.json(products, { status: 200 });
	} catch (err) {
		console.log("Ошибка получения товаров: " + err);
		return NextResponse.json({ error: "Ошибка получения товаров" }, { status: 500 });
	}
}
