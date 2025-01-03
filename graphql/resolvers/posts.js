const  { AuthenticationError } = require('apollo-server');
const Post = require('../../models/post')
const checkAuth = require('../../util/check-auth');
module.exports={
    Query:{
        async getPosts(){
        try{
         const posts =await Post.find().sort({ createdAt: -1});
         return posts;
        }catch(err){
         throw new Error(err)
        }
         },
         async getPost(_, {postId}){
            try{
                const post =await Post.findById(postId);
                   if(post){
                    return post;
                   }
                   else{
                    throw new Error('Post not found');
                   }
            } catch(err){
                throw new Error(err);
            }
         }
     },
     Mutation:{
        /*async createPost(_,{body}, context){
            const user =checkAuth(context);
            console.log(user);
            if(args.body.trim() === ''){
                throw new Error('Post body must not be empty');
            }
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });
            const post = await newPost.save();
            return post;
     }*/
            async createPost(_, {body}, context) {
                console.log('createPosts');
                const user = checkAuth(context);
               // console.log(user);
                if (body.trim() === '') {
                    throw new Error('Post body must not be empty');
                }
                const newPost = new Post({
                    body, // Use args.body here
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString()
                });
                const post = await newPost.save();
                return post;
            },
        async deletePost(_, {postId}, context) {
            const user = checkAuth(context);
            try{
                const post = await Post.findById(postId);
                if(user.username === post.username){
                    await post.deleteOne();
                    return 'Post deleted successfully';
                } else {
                     throw new AuthenticationError('Action not allowed');
                }
            } catch(err){
                throw new Error(err);
            }
        }
     }
};