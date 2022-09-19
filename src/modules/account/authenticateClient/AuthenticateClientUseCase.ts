import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute ({ username, password }: IAuthenticateClient) {
    // Verificar se o usuario está cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if (!client) {
      throw new Error("Username or password invalid")
    }

    // Verifica se a senha corresponde ao username
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) throw new Error("username or password incorrect");

    // Se a senha corresponde ao username irar ser gerado o token
    const token = sign({username}, "42b2c62d6abaf54d142763c82581752f", {
      subject: client.id,
      expiresIn: "1d"
    });

    return token;
  }
}