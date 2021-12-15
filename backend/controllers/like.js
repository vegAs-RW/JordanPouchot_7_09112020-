// Imports
const jwt = require("jsonwebtoken");
const db = require('../models/index');

/*const Post = db.posts;
const User = db.users;
const Comment = db.comments;*/

// Permet d'aimer un message
exports.likePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
    const userId = decodedToken.userId;
    const isliked = req.body.like
    

    db.Post.findOne({
      
        where: { id: req.params.postId },
    })

    .then(postfound => {
        if(!postfound) {
            return res.status(404).json({ error: 'Le message n\'a pas été trouvé' })
        } else if (isliked == false) {
            db.Like.create({ 
                postId: req.params.postId, 
                userId: userId 
            })
            .then(response => {
                console.log(postfound.likes);
                
                db.Post.update({ 
                    likes: postfound.likes +1
                },{
                    where: { id: req.params.postId }
                })
                .then(() => res.status(201).json({ message: 'Vous aimez ce message !' }))
                .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' })) 
            })
            .catch(error => res.status(400).json({ error: '⚠ Oops, une erreur s\'est produite !' }))
        } else if(isliked == true) {
            db.Like.destroy({ 
                where: { 
                    postId: req.params.postId, 
                    userId: userId 
                } 
            })
            .then(() => {
                db.Post.update({ 
                    likes: postfound.likes -1
                },{
                    where: { id: req.params.postId }
                })
                .then(() => res.status(201).json({ message: 'Vous n\'aimez plus ce message' }))
                .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' })) 
            })
            .catch(error => res.status(400).json({ error: '⚠ Oops, une erreur s\'est produite !' }))
        } else {
            console.log('ko');
        }
    })
    .catch(error => res.status(400).json({ error: '⚠ Oops, une erreur s\'est produite !' }))  
}

// Permet d'afficher tous les likes pour un message
exports.getAllLike = (req, res, next) => {
    db.Like.findAll({
        where: { postId: req.params.postId},
        include: {
            model: db.User,
            attributes: ["username"]
        },
    })
    .then(likePostFound => {
        if(likePostFound) {
            res.status(200).json(likePostFound);
            console.log(likePostFound);
        } else {
            res.status(404).json({ error: 'Aucun like trouvé' });
        }
    })
    .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' }))
}