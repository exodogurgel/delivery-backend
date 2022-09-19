import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute ({ username, password }: IAuthenticateDeliveryman) {
    // Verificar se o usuario está cadastrado
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if (!deliveryman) {
      throw new Error("Username or password invalid")
    }

    // Verifica se a senha corresponde ao username
    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) throw new Error("username or password incorrect");

    // Se a senha corresponde ao username irar ser gerado o token
    const token = sign({username}, "42b2c62d6abaf54d142723c82581752f", {
      subject: deliveryman.id,
      expiresIn: "1d"
    });

    return token;
  }
}