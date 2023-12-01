import UserModel from "../features/user/user.model.js";

export default function basicAuthorizer(req, res, next){
    // 1. Check if Authorization headers is empty
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        res.status(401).send('No Authorization details found')
    }
    console.log(authHeader);

    // 2. Extract the credentials . [Basic qwertyui768]
    const base64Credentials = authHeader.replace('Basic ','');
    console.log(base64Credentials)

    // 3. Decode the credentials
    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8');
    console.log(decodedCreds); //[username:password]
    const creds = decodedCreds.split(':');

    const user = UserModel.getAllUsers().find((u)=>u.email == creds[0] && u.password == creds[1]);
    if(user){
        next();
    }
    else{
        return res.status(401).send('Invalid Credentials')
    }
}