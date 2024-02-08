import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const addArticleChild = async(req, res) => {
    const {title, imageUrl, button, text} = req.body
    const { id } = req.params;

    try {
        const childArticle = await prisma.articleChild.create({
            data: {
                title,
                text,
                imageUrl,
                url: button ? title : '',
                ArticleID: +id
            }
        })

        return res.status(200).json({msg: 'Creado correctamente', childArticle})
    } catch (error) {
        console.log(error)
    }
}

const updateArticleChild = async(req, res) => {

}

const deleteArticleChild = async(req, res) => {

}

export {
    addArticleChild,
    updateArticleChild,
    deleteArticleChild
}