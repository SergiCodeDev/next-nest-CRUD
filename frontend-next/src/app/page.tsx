import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
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
  );
}
