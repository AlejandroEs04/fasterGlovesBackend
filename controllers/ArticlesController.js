import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getArticles = async(req, res) => {
    try {
        const articles = await prisma.article.findMany({
            include: {
                type: true,
                articlesChild: true
            }
        })

        return res.status(200).json({msg: "Ok", articles});
    } catch (error) {
        console.log(error)
    }
}

const addArticle = async(req, res) => {
    
}

const updateArticle = async(req, res) => {

}

const deleteArticle = async(req, res) => {

}

export {
    getArticles,
    addArticle,
    updateArticle,
    deleteArticle
}


