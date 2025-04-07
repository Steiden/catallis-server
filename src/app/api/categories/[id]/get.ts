import { prisma } from "@/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(requset: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;

		const product = await prisma.category.findUnique({
			where: {
				id,
			},
		});

		return NextResponse.json(product, { status: 200 });
	} catch (err) {
		console.log("Ошибка при получении категории: " + err);
		return NextResponse.json({ error: "Ошибка при получении категории" }, { status: 500 });
	}
}
