import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAll = async(req, res) => {
    try {
        const types = await prisma.type.findMany({});

        return res.status(200).json({msg: 'Ok', types});
    } catch (error) {
        
    }
}

export {
    findAll
}