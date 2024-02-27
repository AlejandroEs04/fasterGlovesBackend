import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const deleteSize = async(productID, sizeID) => {
    const sizeDel = await prisma.detProductSize.findFirst({
        where: {
            productID: productID,
            sizeID: sizeID
        }
    })

    await prisma.detProductSize.delete({
        where: {
            ID: sizeDel.ID
        }
    })
}

export default deleteSize