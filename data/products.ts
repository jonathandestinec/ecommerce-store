import { Product } from "@/types";

const products: Product[] = [
    {
        name: "Rounded Red Hat",
        id: 10,
        price: 10632,
        colors: ["#FFD700", "#000000"],
        images: ["/assets/products/1.png"],
        saleStatus: "Available"
    },
    {
        name: "Linen-blend Shirt",
        id: 11,
        price: 22593,
        colors: ["#8DB4D2", "#FFD1DC"],
        images: ["/assets/products/2.png"],
        saleStatus: "Sold"
    },
    {
        name: "Long-sleeve Coat",
        id: 12,
        price: 140875,
        colors: ["#D0D5DD", "#D1E9CF"],
        images: ["/assets/products/3.png"],
        saleStatus: "Available"
    },
    {
        name: "Boxy Denim Hat",
        id: 13,
        price: 33225,
        colors: ["#8DB4D2", "#1D3557"],
        images: ["/assets/products/4.png"],
        saleStatus: "Available"
    },
    {
        name: "Linen Plain Top",
        id: 14,
        price: 33225,
        colors: ["#D1E9CF", "#000000"],
        images: ["/assets/products/5.png"],
        saleStatus: "Available"
    },
    {
        name: "Oversized T-shirt",
        id: 15,
        price: 14619,
        colors: ["#FFD1DC", "#D8B4E2"],
        images: ["/assets/products/6.png"],
        saleStatus: "Available",
        discount: 18606
    },
    {
        name: "Polarised Sunglasses",
        id: 16,
        price: 23922,
        colors: ["#1D3557", "#8B5A2B"],
        images: ["/assets/products/7.png"],
        saleStatus: "Available",
        discount: 27909
    },
    {
        name: "Rockstar Jacket",
        id: 17,
        price: 29238,
        colors: ["#D8B4E2", "#8DB4D2"],
        images: ["/assets/products/8.png"],
        saleStatus: "Available",
    },
    {
        name: "Dotted Black Dress",
        id: 18,
        price: 26580,
        colors: ["#1D3557", "#000000", "#8DB4D2"],
        images: ["/assets/products/9.png"],
        saleStatus: "Available",
    }
]

export { products }
