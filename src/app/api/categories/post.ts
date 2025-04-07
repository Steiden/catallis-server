import { prisma } from "@/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name } = body;

		const product = await prisma.category.create({
			data: {
				name,
			},
		});

		return NextResponse.json(product, { status: 200 });
	} catch (err) {
		console.log("Ошибка при создании категории: " + err);
		NextResponse.json({ error: "Ошибка при создании категории" }, { status: 500 });
	}
}
