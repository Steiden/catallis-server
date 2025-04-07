import { prisma } from "@/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const products = await prisma.category.findMany();

		return NextResponse.json(products, { status: 200 });
	} catch (err) {
		console.log("Ошибка получения категорий: " + err);
		return NextResponse.json({ error: "Ошибка получения категорий" }, { status: 500 });
	}
}
