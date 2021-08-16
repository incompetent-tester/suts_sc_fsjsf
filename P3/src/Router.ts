import express from 'express'

const appRouter = express.Router()
export default appRouter


appRouter.get('/about', (_,res) => {
    res.render('pages/about')
})

appRouter.get('/', (_,res) => {
    res.render('pages/index')
})
