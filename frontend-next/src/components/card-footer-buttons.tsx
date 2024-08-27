"use client"

import { deleteProduct } from "@/app/products/products.api";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function CardFooterButtons({ product }: any) {
    const router = useRouter()

    async function handleRemoveProduct(id: any) {
        await deleteProduct(id)
        router.refresh()
    }
    return (
        <>
            <Button
                onClick={() => {
                    router.push(`/products/${product.id}/edit`)
                }}
            /* 
            // si quieres que toda la tarjeta sea un enlace para ver producto
            onClick={(e) => {
                e.stopPropagation();
                router.push(`/products/${product.id}/edit`);
            }} 
            */
            >
                Editar
            </Button>
            <Button
                variant="destructive"
                onClick={() => handleRemoveProduct(product.id)}
            >
                Eliminar
            </Button>
        </>
    )
}