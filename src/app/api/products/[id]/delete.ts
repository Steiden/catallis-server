import { prisma } from "@/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(requset: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;

		const product = await prisma.product.delete({
			where: {
				id,
			},
		});

		return NextResponse.json(product, { status: 200 });
	} catch (err) {
		console.log("Ошибка при удалении продукта: " + err);
		return NextResponse.json({ error: "Ошибка при удалении продукта" }, { status: 500 });
	}
}
