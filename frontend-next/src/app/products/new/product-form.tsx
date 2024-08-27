"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { createProduct, updateProduct } from "../products.api"
import { useParams, useRouter } from "next/navigation"

export default function ProductForm({ product }: any) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: product?.name,
            description: product?.description,
            price: product?.price,
            image: product?.image,
        }
    })
    const router = useRouter()
    const params = useParams<{ id: string }>();

    const onSubmit = handleSubmit(async data => {
        if (params?.id) {
            const res = await updateProduct(params.id, {
                ...data,
                price: parseFloat(data.price),
            })
            console.log(res)
        } else {
            await createProduct({
                ...data,
                price: parseFloat(data.price),
            });
        }

        router.push("/")
        router.refresh()
    })
    return (
        <form id="product-form" onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Nombre:</Label>
                    <Input
                        id="name"
                        placeholder="Nombre de tu producto"
                        {...register("name", { required: "El nombre es requerido" })}
                    />
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Descripción:</Label>
                    <Input
                        id="description"
                        placeholder="Descripción de tu producto"
                        {...register("description", { required: "La descripción es requerida" })}
                    />
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="price">Precio:</Label>
                    <Input
                        id="price"
                        placeholder="Precio del producto"
                        type="number"
                        step="0.01"
                        {...register("price", { required: "El precio es requerido" })}
                    />
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="image">Imagen:</Label>
                    <Input
                        id="image"
                        placeholder="URL de la imagen del producto"
                        {...register("image")}
                    />
                </div>
            </div>
        </form>
    )
}