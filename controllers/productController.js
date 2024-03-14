import { PrismaClient } from "@prisma/client";
import deleteSize from "../helpers/eliminarSize.js";

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
    const product = await req.body.product

    try {
        const sizeProduct = await prisma.detProductSize.findMany({
            where: {
                productID: product.ID
            }
        })

        if(product.xs) {
            if(!sizeProduct.filter(size => size.sizeID === 1).length > 0) {
                await prisma.detProductSize.create({
                    data: {
                        productID: product.ID,
                        sizeID: 1
                    }
                }) 
            } 
        } else {
            if(sizeProduct.filter(size => size.sizeID === 1).length > 0) {
                deleteSize(product.ID, 1)
            }
        }

        if(product.s) {
            if(!sizeProduct.filter(size => size.sizeID === 2).length > 0) {
                await prisma.detProductSize.create({
                    data: {
                        productID: product.ID,
                        sizeID: 2
                    }
                }) 
            }
        } else {
            if(sizeProduct.filter(size => size.sizeID === 2).length > 0) {
                deleteSize(product.ID, 2)
            }
        }

        if(product.m) {
            if(!sizeProduct.filter(size => size.sizeID === 3).length > 0) {
                await prisma.detProductSize.create({
                    data: {
                        productID: product.ID,
                        sizeID: 3
                    }
                }) 
            }
        } else {
            if(sizeProduct.filter(size => size.sizeID === 3).length > 0) {
                deleteSize(product.ID, 3)
            }
        }

        if(product.l) {
            if(!sizeProduct.filter(size => size.sizeID === 4).length > 0) {
                await prisma.detProductSize.create({
                    data: {
                        productID: product.ID,
                        sizeID: 4
                    }
                }) 
            }
        } else {
            if(sizeProduct.filter(size => size.sizeID === 4).length > 0) {
                deleteSize(product.ID, 4)
            }
        }

        if(product.xl) {
            if(!sizeProduct.filter(size => size.sizeID === 5).length > 0) {
                await prisma.detProductSize.create({
                    data: {
                        productID: product.ID,
                        sizeID: 5
                    }
                }) 
            }
        } else {
            if(sizeProduct.filter(size => size.sizeID === 5).length > 0) {
                deleteSize(product.ID, 5)
            }
        }

        await prisma.product.update({
            where: {
                ID: product.ID
            },
            data: {
                name: product.name,
                price: +product.price,
                amount: +product.amount,
                typeID: +product.typeID,
                description: product.description,
                imageUrl: product.imageURL
            }
        })

        return res.status(200).json({msg: 'Producto Actualizado Correctamente'});
    } catch (error) {
        console.log(error)
    }
}

const deleteOne = async(req, res) => {
    const {id} = await req.params

    try {
        await prisma.product.update({
            where: {
                ID: +id
            }
        })

        res.status(200).json({msg: 'Producto Eliminado Correctamente'})
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