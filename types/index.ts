export interface NewArrivals {
    image: string;
    name: string;
    seller: string;
    rating: number | 5;
    reviews: number | 4500;
    price: number | 95.50;
    saleStatus: "Almost Sold Out" | "Sold" | "Available";
    id: number;
}

export interface Reviews {
    customerName: string;
    customerRating: 1 | 2 | 3 | 4 | 5;
    customerOccupation: string;
    customerQuote: string;
    customerProfilePhoto: string;
    id: number;
}

export interface NavLinks {
    text: string;
    url: string;
}

export interface ProductLayouts {
    layoutName: "1-col" | "2-cols" | "3-cols" | "4-cols" | "5-cols"
    layoutIcon: React.ReactNode,
    __class: string
}

export interface Product {
    image: string;
    name: string;
    seller?: string;
    rating?: number | 5;
    reviews?: number | 4500;
    price: number | 95.50;
    saleStatus: "Almost Sold Out" | "Sold" | "Available";
    id: number;
    colors?: string[];
    discount?: number;
}