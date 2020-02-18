const express = require('express');

const Post = require('../../models/post');


const getPosts = async (req, res, next) => {

    try {

        let posts = await Post.find({});

        if(posts.length > 0){
            res.status(200).json({
                'message': "Posts fetched successfully",
                'data': posts
            });
        }

        return res.status(404).json({
            'code': "Data not found",
            'description': "No data available in the database"
        });

    } catch (error) {
        return res.status(500),json({
            'code': 'INTERNAL SERVER ERROR',
            'description': 'Something went wrong please try again later'
        });
    }
}


const getPost = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);

        if(post){
            return res.status(200).json({
                message: `Data for ${req.params.id} fetched successfully.`,
                data: post
            })
        }

        return res.status(404).json({
            code: 'Data not found',
            'description': 'No data available for the requested parameter'
        })
    } catch (error) {
        return res.status(500).json({
            code: 'INTERNAL SERVER ERROR',
            description: 'Something went wrong, please try again later'
        })
    }
}


const createPost = async (req, res, next) => {
    try {
        const {title, description, body} = req.body;

        if(title === undefined || title === ''){
                return res.status(422).json({
                    code: "REQUIRED FIELD MISSING",
                    description: "Title is required"
                })
        }
        if(description === undefined || description === ''){
            return res.status(422).json({
                code: "REQUIRED FIELD MISSING",
                description: "Description is required"
            })
        }

        const payload = {
            title: title,
            description: description,
            body: body
        }

        let newPost = await Post.create(payload);

        if(newPost){
            res.status(201).json({
                message: 'Post created Successfully',
                data: newPost
            })
        } else {
            throw new Error('something went wrong');
        }

   
    } catch (error) {
        return res.status(500).json({
            code: 'INTERNAL SERVER ERROR',
            description: 'Something went wrong please try again later'
        })
    }
}


const updatePost = async (req, res, next) => {

    try {
        const id = req.params.id;
        const {title, description, body} = req.body;

        if(title === undefined || title === ''){
            return res.status(422).json({
                code: "REQUIRED FIELD MISSING",
                description: "Title is required"
            })
        }
        if(description === undefined || description === ''){
            return res.status(422).json({
                code: "REQUIRED FIELD MISSING",
                description: "Description is required"
            })
        }

       let post = await Post.findById(id);
       
       if (!post) {
           return res.status(404).json({
               code: 'POST NOT FOUND',
               description: 'No Post found for the requested parameter'
           })
       }

       const modifiedPost = {
           title: title,
           description: description,
           body: body
       }
       

       let modifyPost = await Post.findByIdAndUpdate(id, modifiedPost, {
           new: true
       })

       if(modifyPost){
           return res.status(200).json({
               message: `Post with ID ${id} updated successfully`,
               data: modifyPost
           });
       }


        
    } catch (error) {
        return res.status(500).json({
            code: 'INTERNAL SERVER ERROR',
            description: 'something went wrong please try again later'
        })
    }

}



const deletePost = async (req, res, next) => {
    const id = req.params.id;
    try {
        let post = Post.findByIdAndRemove(id)
        if(post) {
            return res.status(204).json({
                message: `User with id ${id} removed/deleted successfully`
            });
        }
        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No posts found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}


module.exports = {
    getPosts:getPosts,
    getPost:getPost,
    createPost:createPost,
    updatePost:updatePost,
    deletePost:deletePost


}