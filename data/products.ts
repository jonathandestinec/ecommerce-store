import { Product } from "@/types";

const products: Product[] = [
    {
        name: "Rounded Red Hat",
        id: 10,
        price: 8.00,
        colors: ["#FFD700", "#000000"],
        image: "/assets/products/1.png",
        saleStatus: "Available"
    },
    {
        name: "Linen-blend Shirt",
        id: 11,
        price: 17.00,
        colors: ["#8DB4D2", "#FFD1DC"],
        image: "/assets/products/2.png",
        saleStatus: "Sold"
    },
    {
        name: "Long-sleeve Coat",
        id: 12,
        price: 106.00,
        colors: ["#D0D5DD", "#D1E9CF"],
        image: "/assets/products/3.png",
        saleStatus: "Available"
    },
    {
        name: "Boxy Denim Hat",
        id: 13,
        price: 25.00,
        colors: ["#8DB4D2", "#1D3557"],
        image: "/assets/products/4.png",
        saleStatus: "Available"
    },
    {
        name: "Linen Plain Top",
        id: 14,
        price: 25.00,
        colors: ["#D1E9CF", "#000000"],
        image: "/assets/products/5.png",
        saleStatus: "Available"
    },
    {
        name: "Oversized T-shirt",
        id: 15,
        price: 11.00,
        colors: ["#FFD1DC", "#D8B4E2"],
        image: "/assets/products/6.png",
        saleStatus: "Available",
        discount: 14.00
    },
    {
        name: "Polarised Sunglasses",
        id: 16,
        price: 18.00,
        colors: ["#1D3557", "#8B5A2B"],
        image: "/assets/products/7.png",
        saleStatus: "Available",
        discount: 21.00
    },
    {
        name: "Rockstar Jacket",
        id: 17,
        price: 22.00,
        colors: ["#D8B4E2", "#8DB4D2"],
        image: "/assets/products/8.png",
        saleStatus: "Available",
    },
    {
        name: "Dotted Black Dress",
        id: 18,
        price: 20.00,
        colors: ["#1D3557", "#000000", "#8DB4D2"],
        image: "/assets/products/9.png",
        saleStatus: "Available",
    }
]

export { products }