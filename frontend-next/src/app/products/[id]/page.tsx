
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getProduct } from "../products.api"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { priceFormat } from "@/utils/price-format"

export default async function ProductosPage({ params }: any) {
    //console.log(params)
    const product = await getProduct(params.id)
    //console.log(product)
    return (
        <main className="min-h-screen grid place-content-center">
            <Card className="w-[900px]">
                <CardHeader className="flex-row items-baseline justify-between">
                    <CardTitle>Detalle del producto: {product.id}</CardTitle>
                    <Link
                        href="/"
                        className={buttonVariants()}
                    >
                        Volver
                    </Link>
                </CardHeader>
                <CardContent>
                    <img
                        src={product.image}
                        alt={product.image}
                        className="w-full aspect-video object-cover object-center mb-6 rounded-xl"
                    />
                    <div className="flex flex-row items-baseline justify-between pb-6">
                        <CardTitle>{product.name}</CardTitle>
                        {/* <span>{product.price}€</span> */}
                        <span>{priceFormat(product.price)}</span>
                    </div>
                    <CardDescription>{product.description}</CardDescription>
                </CardContent>
                <CardFooter className="justify-between">
                    <Button>Comprar</Button>
                </CardFooter>
            </Card>
        </main>
    )
}