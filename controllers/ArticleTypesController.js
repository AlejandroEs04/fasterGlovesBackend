import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getTypes = async(req, res) => {
    try {
        const types = await prisma.articleType.findMany();

        console.log(types);
    } catch (error) {
        console.log(error)
    }
}

const addType = async(req, res) => {

}

const updateType = async(req, res) => {

}

const deleteType = async(req, res) => {

}

export {
    getTypes,
    addType,
    updateType,
    deleteType
}
