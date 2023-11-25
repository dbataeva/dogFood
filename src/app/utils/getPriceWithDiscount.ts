export const getPriceWithDiscount = (price: number, discount: number) =>
	discount ? Math.ceil((price * (100 - discount)) / 100) : price;
