import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute ({ password, username }: ICreateDeliveryman) {
    // Validar se o deliveryman existe
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if (deliverymanExist) throw new Error(`Deliveryman ${username} already exists`)

    // Se não existir 

    // Criptografar a senha
    const hashPassword = await hash(password, 10);

    // Salvar o deliveryman
    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return deliveryman
  }
}