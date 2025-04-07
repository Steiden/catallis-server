import { prisma } from "@/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const body = await request.json();
		const { name, description, price, image, categoryId } = body;

		const product = await prisma.product.update({
			where: {
				id,
			},
			data: {
				name,
				description,
				price,
				image,
				categoryId,
			},
			include: {
				category: true,
			},
		});

		return NextResponse.json(product, { status: 200 });
	} catch (err) {
		console.log("Ошибка при создании продукта: " + err);
		NextResponse.json({ error: "Ошибка при создании продукта" }, { status: 500 });
	}
}
