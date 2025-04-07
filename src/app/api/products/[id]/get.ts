import { prisma } from "@/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(requset: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;

		const product = await prisma.product.findUnique({
			where: {
				id,
			},
			include: {
				category: true,
			},
		});

		return NextResponse.json(product, { status: 200 });
	} catch (err) {
		console.log("Ошибка при получении продукта: " + err);
		return NextResponse.json({ error: "Ошибка при получении продукта" }, { status: 500 });
	}
}
