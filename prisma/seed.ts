import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

// Инициализация Prisma (для обращений к БД)
const prisma = new PrismaClient();

async function seed() {
	// Изображения продуктов
	const imageUrls: string[] = [
		"http://localhost:8000/images/product1.png",
		"http://localhost:8000/images/product2.png",
		"http://localhost:8000/images/product3.png",
		"http://localhost:8000/images/product4.png",
		"http://localhost:8000/images/product5.png",
		"http://localhost:8000/images/product6.png",
	];

	// Генерация фейковых продуктов
	await Promise.all(
		Array.from({ length: 50 }, () => {
			return prisma.product.create({
				data: {
					name: faker.commerce.productName(),
					image: imageUrls[faker.number.int({ min: 0, max: imageUrls.length - 1 })],
					price: +faker.commerce.price(),
					is_promo: faker.datatype.boolean(),
				},
			});
		})
	);

	console.log("Тестовые данные созданы!");
}

// Запуск сидера
seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
