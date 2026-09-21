interface NewArrivals {
    image: string;
    name: string;
    seller: string;
    rating: number | 5;
    reviews: number | 4500;
    price: number | 95.50;
    saleStatus: "Almost Sold Out" | "Sold" | "Available";
    id: number;
}


const newArivals: NewArrivals[] = [
    { image: "/assets/new-arrivals/product1.png", name: "Shiny Dress", seller: "AI Karom", rating: 5, reviews: 4500, price: 95.50, saleStatus: "Almost Sold Out", id: 1 },

    { image: "/assets/new-arrivals/product2.png", name: "Long Dress", seller: "AI Karom", rating: 5, reviews: 4500, price: 95.50, saleStatus: "Almost Sold Out", id: 2 },

    { image: "/assets/new-arrivals/product3.png", name: "Full Sweater", seller: "AI Karom", rating: 5, reviews: 4500, price: 95.50, saleStatus: "Almost Sold Out", id: 3 },

    { image: "/assets/new-arrivals/product4.png", name: "White Dress", seller: "AI Karom", rating: 5, reviews: 4500, price: 95.50, saleStatus: "Almost Sold Out", id: 4 },

    { image: "/assets/new-arrivals/product5.png", name: "Colorful Dress", seller: "AI Karom", rating: 5, reviews: 4500, price: 95.50, saleStatus: "Almost Sold Out", id: 5 },

    { image: "/assets/new-arrivals/product6.png", name: "White Shirt", seller: "AI Karom", rating: 5, reviews: 4500, price: 95.50, saleStatus: "Almost Sold Out", id: 6 },
]

export { newArivals }