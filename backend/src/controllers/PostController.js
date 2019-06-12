const Post = require('../models/Post')
//const sharp = require('sharp')

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt')
        res.json(posts)
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body
        const { filename: image } = req.file
        const post =
             await Post.create({
                author,
                place,
                description,
                hashtags,
                image
            }).catch((r) => console.log(r))
        req.io.emit('post', post)
        return res.json(post)
    }
}