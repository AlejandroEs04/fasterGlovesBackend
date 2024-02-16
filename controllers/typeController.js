import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAll = async(req, res) => {
    try {
        const types = await prisma.type.findMany({});

        return res.status(200).json({msg: 'Ok', types});
    } catch (error) {
        
    }
}

const create = async(req, res) => {
    const { user } = req
    const { model } = req.body
    
    try {
        const type = await prisma.type.create({
            data: {
                name: model.name,
                description: model.description
            }
        })

        return res.status(200).json({msg: 'Ok', type});
    } catch (error) {
        console.log(error)
    }
}

const update = async(req, res) => {

}

const deleteOne = async(req, res) => {

}

export {
    findAll,
    create, 
    update, 
    deleteOne
}