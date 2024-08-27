import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getProducts } from "./products/products.api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CardFooterButtons from "@/components/card-footer-buttons";
import { priceFormat } from "@/utils/price-format";

export const dynamic = "force-dynamic"

export default async function Home() {
  const products = await getProducts()

  return (
    <>
      <header className=" container mx-auto pt-5">
        <div className=" flex justify-between">
          <h1 className=" text-3xl font-bold">
            Productos
          </h1>
          <Link
            href="/products/new"
            className={buttonVariants()}
          >
            Crear Producto
          </Link>
        </div>
      </header>
      <main className="pt-6 container grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {
          products.map((product: any) => (
            <Card
              key={product.id}
              className="flex flex-col justify-between"
            >

              <div>
                <CardHeader className="flex-row items-baseline justify-between">
                  <CardTitle>{product.name}</CardTitle>
                  {/* <span>{product.price}€</span> */}
                  <span>{priceFormat(product.price)}</span>
                </CardHeader>
                <CardContent>
                  <img
                    src={product.image}
                    alt={product.image}
                    className="w-full aspect-video object-cover object-center mb-6 rounded-xl"
                  />
                  <CardDescription>{product.description} <Link className="text-blue-600" href={`/products/${product.id}`}>Leer más...</Link></CardDescription>
                </CardContent>
              </div>
              <CardFooter className="justify-between">
                <CardFooterButtons product={product} />
              </CardFooter>

            </Card>
          ))
        }
      </main>
    </>
  );
}
