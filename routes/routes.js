import express from 'express' ;
import path from 'path' ;
import filename from '../getfilename.js' ;
import multer from 'multer' ;
import FileIntoJson from '../controller/filetojson.js'


const storage = multer.diskStorage({
    destination:(req,file,cb)=>
    {
        cb(null,'uploads');
    },
    filename:(req,file,cb)=>
    {
        const { originalname}=file;
        cb(null,`${originalname}`)
    }
});
const upload = multer({storage});

const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(`${filename}/index.html`));
});

router.post('/show',upload.single('myFile'),async (req,res,next)=>
{

    const algo=req.body.showalgo;
    const fileName=req.file.filename;
    let data={};
    console.log("------------")
    data=await FileIntoJson(fileName);
    console.log(data);
    res.sendFile(path.join(`${filename}/showDiagram.html`));
});


export default router;