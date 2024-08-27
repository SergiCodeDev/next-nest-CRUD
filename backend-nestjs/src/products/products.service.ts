import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {

  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prismaService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Product with name ${createProductDto.name} already exists`,
          );
        }
      }

      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.prismaService.product.findMany()
  }

  async findOne(id: number) {
    const productoEncontrado = await this.prismaService.product.findUnique({
      where: {
        id: id,
      }
    })

    if (!productoEncontrado) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }

    return productoEncontrado;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productoActualizado = await this.prismaService.product.update({
      where: {
        id
      },
      data: updateProductDto
    })

    if (!productoActualizado){
      throw new NotFoundException(`Product with id ${id} not found`)
    }

    return productoActualizado;
  }

  async remove(id: number) {
    const eliminarProducto = await this.prismaService.product.delete({
      where: {
        id
      }
    })

    if (!eliminarProducto) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return eliminarProducto;
  }
}
