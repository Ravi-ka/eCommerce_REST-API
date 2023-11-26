import multer from "multer";

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null,'./uploads/')
    },
    filename : function (req, file, cb){
        //const fileName = Date.now() + file.originalname(); alternate way is in next line
        cb(null, new Date().toISOString().replace(/:/g,'_')+ file.originalname) // replace(/:/g,'_') - is particularly for windows filename compatibility
    }
})

export const upload = multer({storage : storage})