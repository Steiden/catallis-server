// scripts/generate-test-data.ts
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
	await prisma.category.createMany({
		data: [
			{
				name: "Электроника",
			},
			{
				name: "Одежда",
			},
			{
				name: "Еда",
			},
		],
	});

	// Генерация продуктов
	const categories = await prisma.category.findMany();
	await Promise.all(
		Array.from({ length: 50 }, () => {
			return prisma.product.create({
				data: {
					name: faker.commerce.productName(),
					description: faker.commerce.productDescription(),
					image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.apple.com%2Fnewsroom%2F2024%2F09%2Fapple-introduces-iphone-16-and-iphone-16-plus%2F&psig=AOvVaw2ZY2VzYtlIxHHAI0CRj8c6&ust=1744084810242000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMiFprCExYwDFQAAAAAdAAAAABAJ",
					price: +faker.commerce.price(),
					categoryId: categories[faker.number.int({ min: 0, max: categories.length - 1 })].id,
				},
			});
		})
	);

	console.log("Тестовые данные созданы!");
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
