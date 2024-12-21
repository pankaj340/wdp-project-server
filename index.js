const {ApolloServer} = require('apollo-server');
const mongoose=require('mongoose');
const resolvers = require('./graphql/resolvers')
const typeDefs =require('./graphql/typeDefs.js')
const {MONGODB}=require('./config.js')

const PORT = process.env.port || 5000;

 const server=new ApolloServer({
    typeDefs,resolvers,
    context:({req, res}) => ({req,res})
 });
 mongoose.connect(MONGODB,{useNewUrlParser:true})
 .then(()=>{
    console.log('MongoDB Connected');
    return server.listen({port:PORT});
 })
 .then((res)=>{
    console.log(`Server is running on port ${res.url}`);
 })
 .catch(err => {
   console.error(err);
 })