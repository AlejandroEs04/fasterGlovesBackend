import { PrismaClient } from "@prisma/client";
import paypal from '@paypal/checkout-server-sdk'

const prisma = new PrismaClient()

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SECRET_KEY;

const envirement = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(envirement)

const getBuy = async(req, res) => {
    const { user } = req;

    try {
        const buys = await prisma.buy.findMany({
            where: {
                userID: user.ID
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

        return res.status(200).json({id: response.result.id})
    } catch (error) {
        console.log(error)
    }
}

const completeBuy = async(req, res) => {
    const { total } = req.body;
    const { user } = req;

    const fecha = Date.now()

    try {
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

            return res.status(200).json({msg: "Muchas gracias por su compra"});
        }
    } catch (error) {
        console.log(error)
    }
}

const updateBuy = async(req, res) => {
    const { id } = req.params;
    const data = req.body

    console.log(data)

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

            return res.status(200).json({msg: "El pedido ha sido entregado"});
        }
    } catch (error) {
        console.log(error)
    }
    
}

export {
    getBuy,
    getAllBuy,
    createOrderPaypal,
    completeBuy,
    updateBuy
}