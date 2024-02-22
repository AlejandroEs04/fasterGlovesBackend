import { PrismaClient } from "@prisma/client";
import hashearPassword from "../helpers/hashearPassword.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import checkPassword from "../helpers/checkPassword.js";
import { emailRegistro, emailForgetPassword } from "../helpers/email.js";

const prisma = new PrismaClient();

const register = async(req, res) => {
    const email = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    })

    if(email) {
        const error = new Error('El correo ya esta ligado a una cuenta');
        return res.status(400).json({msg: error.message});
    }

    const number = await prisma.user.findFirst({
        where: {
            number: req.body.number
        }
    })

    if(number) {
        const error = new Error('El numero ya esta ligado a una cuenta');
        return res.status(400).json({msg: error.message});
    }

    req.body.password = await hashearPassword(req.body.password);
    req.body.token = generarId();

    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                lastName: req.body.lastName,
                password: req.body.password,
                email: req.body.email,
                number: req.body.number,
                token: req.body.token,
                address: req.body.address ?? '',
                neighborhood: req.body.neighborhood ?? '',
                state: req.body.state ?? '',
                city: req.body.city ?? '',
                country: req.body.country ?? '',
                postalCode: req.body.postalCode ?? '',
                externNumber: 0,
                internNumber: 0,
                street: req.body.street ?? ''
            }
        })

        // Send email
        emailRegistro({
            email: user.email,
            name: user.name + ' ' + user.lastName,
            token: user.token,
        })

        return res.status(200).json({msg: "Ok"});
    } catch (error) {
        console.log(error)
    }

    return res.status(200).json({msg: req.body});
}

const auth = async(req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    if(!user) {
        const error = new Error("El correo es incorrecto o no existe");
        return res.status(404).json({msg: error.message});
    }

    if(!user.confirmado) {
        const error = new Error("El usuario no esta confirmado");
        return res.status(404).json({msg: error.message});
    }

    if(await checkPassword(password, user.password)) {
        res.json({
            ID: user.ID,
            name: user.name, 
            lastName: user.lastName, 
            email: user.email,
            number: user.number,
            address: user.address,
            neighborhood: user.neighborhood,
            state: user.state,
            city: user.city,
            country: user.country,
            postalCode: user.postalCode,
            externNumber: +user.externNumber,
            internNumber: +user.internNumber,
            street: user.street,
            token: await generarJWT(user.ID),
            admin: user.admin
        })
    } else {
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message})
    }
}

const confirm = async(req, res) => {
    const { token } = req.params
    
    const user = await prisma.user.findFirst({
        where: {
            token
        }
    })

    if(!user) {
        const error = new Error('Token no valido');
        return res.status(403).json({msg: error.message})
    }
    
    try {
        await prisma.user.update({
            where: {
                ID: user.ID
            },
            data: {
                token: "",
                confirmado: true
            }
        })

        res.json({ msg: 'Usuario Confirmado Correctamente' })
    } catch (error) {
        console.log(error)
    }
}

const forgetPassword = async(req, res) => {
    const { email, number } = req.body;

    const userDB = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(!userDB) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message})
    }

    try {
        const user = await prisma.user.update({
            where: {
                ID: userDB.ID
            },
            data: {
                token: generarId()
            }
        })

        emailForgetPassword({
            email: user.email,
            name: user.name + ' ' + user.lastName,
            token: user.token,
        })

        res.json({ msg: "Hemos enviado un email con las instrucciones" })
    } catch (error) {
        console.log(error)
    }
}

const checkToken = async(req, res) => {
    const { token } = req.params;

    const tokenValido = await prisma.user.findFirst({
        where: {
            token
        }
    });

    if(tokenValido) {
        res.json({msg: 'Token valido y el usuario existe'})
    } else {
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message})
    }
}

const newPassword = async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await prisma.user.findFirst({
        where: {
            token
        }
    });

    if(user) {
        try {
            await prisma.user.update({
                where: {
                    ID: user.ID
                },
                data: {
                    password: await hashearPassword(password),
                    token: ""
                }
            })

            return res.status(200).json({msg: "Contraseña restablecida correctamente"})
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message})
    }
}

const porfile = async(req, res) => {
    const { user } = req;

    res.json(user)
}
const update = async(req, res) => {
    const {
        name, 
        lastName, 
        email, 
        number,
        address, 
        postalCode, 
        neighborhood,
        state,
        city, 
        country,
        internNumber,
        externNumber,
        street
    } = req.body

    const { user } = req;

    user.name = name ?? user.name;
    user.lastName = lastName ?? user.lastName;
    user.email = email ?? user.email;
    user.number = number ?? user.number;
    user.address = address.address ?? user.address;
    user.postalCode = postalCode ?? user.postalCode;
    user.neighborhood = neighborhood ?? user.neighborhood;
    user.state = state ?? user.state;
    user.city = city ?? user.city;
    user.country = country ?? user.country;
    user.internNumber = internNumber ?? user.internNumber;
    user.externNumber = externNumber ?? user.externNumber;
    user.street = street ?? user.street;

    try {
        const userAct = await prisma.user.update({
            where: {
                ID: user.ID
            },
            data: {
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                number: user.number,
                address: user.address,
                postalCode: user.postalCode,
                neighborhood: user.neighborhood,
                state: user.state,
                city: user.city,
                country: user.country,
                internNumber: +user.internNumber,
                externNumber: +user.externNumber,
                street: user.street,
            }
        })

        const { password, token, confirmado, ...userAct2 } = userAct

        return res.status(200).json({msg: "Ok", user: userAct2 })
    } catch (error) {
        console.log(error)
    }
}

const getCart = async(req, res) => {
    const { user } = req;

    try {
        const cart = await prisma.cart.findMany({
            where: {
                userID: user.ID
            },
            include: {
                products: {
                    select: {
                        ID: true,
                        name: true,
                        price: true,
                        imageUrl: true
                    }
                },
                user: {
                    select: {
                        ID: true,
                        name: true,
                        lastName: true,
                        email: true,
                        number: true,
                        address: true,
                        state: true,
                        neighborhood: true,
                        postalCode: true,
                        city: true,
                        country: true,
                        externNumber: true,
                        internNumber: true,
                        street: true
                    }
                },
                size: true
            }
        })

        return res.status(200).json({msg: "Ok", cart})

    } catch (error) {
        console.log(error)
    }

}

const addCart = async(req, res) => {
    const {productID, sizeID, cantidad} = req.body
    const { user } = req;

    const cartProduct = await prisma.cart.findFirst({
        where: {
            sizeID: +sizeID,
            productID: +productID,
            userID: user.ID
        }
    })

    if(cartProduct) {
        await prisma.cart.update({
            where: {
                ID: cartProduct.ID
            },
            data: {
                cantidad: +cantidad
            }
        })

        return res.status(200).json({msg: "Producto actualizado correctamente"})
    }

    try {
        const cart = await prisma.cart.create({
            data: {
                sizeID: +sizeID,
                productID: +productID,
                cantidad: +cantidad,
                userID: user.ID
            },
            include: {
                products: {
                    select: {
                        ID: true,
                        name: true,
                        price: true,
                        imageUrl: true
                    }
                },
                user: {
                    select: {
                        ID: true,
                        name: true,
                        lastName: true,
                        email: true,
                        number: true,
                        address: true,
                        state: true,
                        neighborhood: true,
                        postalCode: true,
                        city: true,
                        country: true,
                        internNumber: true,
                        externNumber: true,
                        street: true,
                    }
                },
                size: true
            }
        }) 
        
        return res.status(200).json({msg: "Producto agregado al carrito", cart})
    } catch (error) {
        console.log(error)
    }
}

const deleteProductCart = async(req, res) => {
    const { ID } = req.body
    const { user } = req;

    try {
        await prisma.cart.delete({
            where: {
                ID
            }
        })

        res.status(200).json({msg: "Producto eliminado correctamente"})
    } catch (error) {
        console.log(error)
    }
}

export {
    register,
    auth,
    confirm,
    forgetPassword,
    checkToken,
    newPassword,
    porfile,
    update,
    getCart,
    addCart,
    deleteProductCart
}