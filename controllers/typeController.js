import { PrismaClient } from "@prisma/client";
import { Console } from "console";

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

    console.log(req.body)
    
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
    const { model } = req.body

    try {
        await prisma.type.update({
            data: {
                name: model.name, 
                description: model.description
            },

            where: {
                ID: +model.ID
            }
        })

        return res.status(200).json({msg: 'Modelo Actualizado Correctamente'});
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'Hubo un error'});
    }
}

const deleteOne = async(req, res) => {
    const {id} = req.params

    try {
        await prisma.product.deleteMany({
            where: {
                typeID: +id
            }
        })
        
        await prisma.type.delete({
            where: {
                ID: +id
            }
        })

        return res.status(200).json({msg: 'Modelo Eliminado Correctamente'});
    } catch (error) {
        console.log(error)
    }
}

export {
    findAll,
    create, 
    update, 
    deleteOne
}