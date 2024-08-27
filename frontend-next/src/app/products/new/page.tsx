import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ProductForm from "./product-form"
import Link from "next/link"
import { getProduct } from "../products.api"

interface Props {
    params: {
        id: string
    }
}

export default async function CardWithForm({ params }: Props) {
    const product = await getProduct(params.id)
    return (
        <main className="min-h-screen grid place-content-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>
                        {
                            params.id ? 'Actualizar' : 'Añadir'
                        }
                        &nbsp;producto
                    </CardTitle>
                    <CardDescription>
                        {
                            params.id ? 'Actualizar' : 'Añadir'
                        }
                        &nbsp;un nuevo producto a tu catálogo con un solo clic.</CardDescription>
                </CardHeader>

                <CardContent>
                    <ProductForm product={product} />
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Link href="/">
                        <Button variant="outline">Cancelar</Button>
                    </Link>

                    <Button type="submit" form="product-form">
                        {
                            params.id ? 'Actualizar' : 'Añadir'
                        }
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}