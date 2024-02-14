import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkAuth = async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await prisma.user.findFirst({
                where: {
                    ID: decoded.id
                },
                select: {
                    ID: true,
                    name: true,
                    lastName: true,
                    email: true,
                    number: true,
                    address: true,
                    postalCode: true,
                    neighborhood: true,
                    state: true,
                    city: true,
                    country: true,
                    admin: true,
                    externNumber: true, 
                    internNumber: true,
                    street: true
                }
            })
        } catch (error) {
            return res.status(404).json({ msg: "Hubo un error" })
        }
    }

    if(!token) {
        const error = new Error("Token no valido")
        return res.status(401).json({msg: error.message})
    }

    next()
}

export default checkAuth