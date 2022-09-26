const jwt =require("jsonwebtoken")

const authentication = async function(req,res,next){

    try{

    // take token from client 
    let token1 = req.headers['authorization'];

    if( token1 == undefined ) { token = req.headers['Authorization']; }

     const authHeader = req.headers.authorization;
     // if No token found then send error
     if (!token1 || !authHeader.startsWith('Bearer ')) {
       return res.status(401).send({
         status: false,
         msg: 'Authentication token is required',
       });
     }

     // Split that Bearer Token
     let token = token1.split(' ')[1];


    //if token is present then decode the token
    let decodedToken = jwt.verify(token,"Book-Management")
    
    // Check Decoded token is here or not
    if(!decodedToken) return res.status(401).send({ status : false, msg : "Token is Not Present"})

    req.decodedToken = decodedToken 
    // if Everything is ok then we head towards Api's
    next();

}
catch(err){
    return res.status(401).send({ status: false, err : "Token is Invalid" })
}
};


module.exports={ authentication }