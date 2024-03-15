import { PrismaClient } from "@prisma/client";
import paypal from '@paypal/checkout-server-sdk'
import { emailBuyComplete, emailBuyCompleteAdmin, emailDelivered, emailOnTheWay } from "../helpers/email.js";
import captureOrder from "../helpers/PayPalCapture.js";

const prisma = new PrismaClient()

const getBuy = async(req, res) => {
    const { id } = req.params;

    try {
        const buy = await prisma.buy.findFirst({
            where: {
                ID: +id
            },
            include: {
                productos: {
                    include: {
                        size: true,
                        product: {
                            include: {
                                type: true
                            }
                        }
                    }
                },
                delivery: true,
                user: true
            }
        })

        return res.status(200).json({msg: "Ok", buy});
    } catch (error) {
        console.log(error)
    }
}

const getUserBuys = async(req, res) => {
    const { user } = req;
    
    try {
        const buys = await prisma.buy.findMany({
            where: {
                userID: +user.ID
            },
            include: {
                user: true,
                productos: true,
                delivery: true
            }
        })

        return res.status(200).json({msg: "Ok", buys});
    } catch (error) {
        console.log(error)
    }
}

const getAllBuy = async(req, res) => {
    const { user } = req;
    
    if(!user.admin) return res.status(401).json({msg: "No estas autorizado"});

    try {
        const buys = await prisma.buy.findMany({
            include: {
                user: true,
                productos: true,
                delivery: true
            }
        })

        return res.status(200).json({msg: "Ok", buys});
    } catch (error) {
        console.log(error)
    }
}

const createOrderPaypal = async(req, res) => {
    const { total, cantidad } = req.body;

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_SECRET_KEY;
    const envirement = new paypal.core.LiveEnvironment(clientId, clientSecret)
    const client = new paypal.core.PayPalHttpClient(envirement)

    let request = new paypal.orders.OrdersCreateRequest();

    request.requestBody({
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount" : {
                    currency_code: "MXN",
                    value: total
                },
                "description": "Compra en Faster - Guantes"
            }
        ]
    })

    try {
        const response = await client.execute(request);

        return res.status(200).json({response})
    } catch (error) {
        console.log(error)
    }
}

const completeBuy = async(req, res) => {
    const { total, orderID } = req.body;
    const { user } = req;
    const fecha = Date.now()

    try {
        await captureOrder(orderID)
    
        const cart = await prisma.cart.findMany({
            where: {
                userID: user.ID
            }
        })

        const buy = await prisma.buy.create({
            data: {
                userID: user.ID,
                amount: +total,
                date: new Date(fecha).toISOString()
            }
        })

        if(buy) {
            const cartAct = cart?.map(productCart => {
                const { ID, userID, ...product } = productCart

                product.buyID = buy.ID

                return product
            })

            await prisma.productBuy.createMany({
                data: cartAct
            })

            await prisma.cart.deleteMany({
                where: {
                    userID: user.ID
                }
            })

            await prisma.delivery.create({
                data: {
                    buyID: buy.ID
                }
            })

            emailBuyComplete({
                name: user.name + ' ' + user.lastName,
                email: user.email, 
                address: user.street + ' ' + user.externNumber + ', ' + user.neighborhood + ', ' + user.postalCode + ', ' + user.city, 
                buyID: buy.ID
            })

            emailBuyCompleteAdmin({
                name: user.name + ' ' + user.lastName,
                email: user.email, 
                phone: user.number,
                address: user.street + ' ' + user.externNumber + ', ' + user.neighborhood + ', ' + user.postalCode + ', ' + user.city, 
                buyID: buy.ID,
                date: fecha
            })

            return res.status(200).json({msg: "Muchas gracias por su compra"});
        }
    } catch (error) {
        console.log(error)
    }
}

const updateBuy = async(req, res) => {
    const { id } = req.params;
    const data = req.body
    const { user } = req

    try {
        if(data.onTheWay) {
            const delivery = await prisma.delivery.findFirst({
                where: {
                    buyID: +id
                }
            })

            await prisma.delivery.update({
                where: {
                    ID: delivery.ID
                },
                data: {
                    onTheWay: true
                }
            })

            emailOnTheWay({
                name: user.name + ' ' + user.lastName,
                email: user.email, 
                address: user.street + ' ' + user.externNumber + ', ' + user.neighborhood + ', ' + user.postalCode + ', ' + user.city, 
                buyID: id
            })

            return res.status(200).json({msg: "El pedido ha sido enviado"});
        } else if(data.delivered) {
            const delivery = await prisma.delivery.findFirst({
                where: {
                    buyID: +id
                }
            })

            await prisma.delivery.update({
                where: {
                    ID: delivery.ID
                },
                data: {
                    delivered: true
                }
            })

            emailDelivered({
                name: user.name + ' ' + user.lastName,
                email: user.email, 
                address: user.street + ' ' + user.externNumber + ', ' + user.neighborhood + ', ' + user.postalCode + ', ' + user.city, 
                buyID: id
            })

            return res.status(200).json({msg: "El pedido ha sido entregado"});
        }
    } catch (error) {
        console.log(error)
    }
    
}

const deleteBuy = async(req, res) => {
    const { id } = req.params

    try {
        await prisma.productBuy.deleteMany({
            where: {
                buyID: +id
            }
        })
        await prisma.delivery.deleteMany({
            where: {
                buyID: +id
            }
        })

        await prisma.buy.delete({
            where: {
                ID: +id
            }
        })

        return res.status(200).json({msg: "Pedido eliminado correctamente"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Hubo un error en el servidor"});
    }
}

export {
    getBuy,
    getUserBuys,
    getAllBuy,
    createOrderPaypal,
    completeBuy,
    updateBuy,
    deleteBuy
}