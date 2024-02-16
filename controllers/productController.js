import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const findAll = async(req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                detProductSize: {
                    include: {
                        size: true
                    }
                },
                detProductColor: {
                    include: {
                        color: true
                    }
                },
                type: true
            }
        })

        return res.status(200).json({msg: 'Ok', products})
    } catch (error) {
        
    }

    return res.status(400).json({msg: "Si funciona"});
}

const create = async(req, res) => {
    try {
        const product = await req.body.product

        const res = await prisma.product.create({
            data: {
                name: product.name,
                price: +product.price,
                amount: +product.amount,
                typeID: +product.typeID,
                description: product.description,
                imageUrl: product.imageURL
            }
        })

        if(product.xs) {
            await prisma.detProductSize.create({
                data: {
                    productID: res.ID,
                    sizeID: 1
                }
            }) 
        }

        if(product.s) {
            await prisma.detProductSize.create({
                data: {
                    productID: res.ID,
                    sizeID: 2
                }
            }) 
        }

        if(product.m) {
            await prisma.detProductSize.create({
                data: {
                    productID: res.ID,
                    sizeID: 3
                }
            }) 
        }

        if(product.l) {
            await prisma.detProductSize.create({
             data: {
                 productID: res.ID,
                 sizeID: 4
             }
            }) 
        }

        if(product.xl) {
            await prisma.detProductSize.create({
             data: {
                 productID: res.ID,
                 sizeID: 5
             }
            }) 
        }

        return res.status(200).json({msg: 'Ok', res});

    } catch (error) {
        console.log(error)
    }

    return
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