import { prisma } from "@/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name,  price, image, is_promo } = body;

		const product = await prisma.product.create({
			data: {
				name,
				price,
				image,
				is_promo,
			}
		});

		return NextResponse.json(product, { status: 200 });
	} catch (err) {
		console.log("Ошибка при создании продукта: " + err);
		NextResponse.json({ error: "Ошибка при создании продукта" }, { status: 500 });
	}
}
