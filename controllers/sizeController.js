import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAll = async(req, res) => {
    try {
        const sizes = await prisma.size.findMany({});

        return res.status(200).json({msg: 'Ok', sizes});
    } catch (error) {
        
    }
}

export {
    findAll
}