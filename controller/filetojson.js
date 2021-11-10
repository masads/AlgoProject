import fs from 'fs/promises' ;
import path, { resolve } from 'path';
import filepath from '../getfilename.js'
export default async (testfile) =>
{
    let json={
        "totalnodes":0,
        "positionX":[
            
        ],
        "positionY":[
            
        ]
    };
    let key=2;
    const arr=await fs.readFile(filepath+'/uploads/'+testfile);
    const array=arr.toString().split('\n');
    json.totalnodes=await (JSON.parse(array[key]));
    key+=2;
    for(let i=0;i<json.totalnodes;i++)
    {
        json.positionX[i]=await JSON.parse(array[key+i].split('\t')[1]);
        json.positionY[i]=await JSON.parse(array[key+i].split('\t')[2]);
    }
    key+=json.totalnodes+1;
    for(let i=0;i<=json.totalnodes;i++)
    {
        let temp=array[key+i].split('\t');
        for(let j=0,k=0;j<temp[0];j++,k+=4)
        {
            json[`p-${i}-${temp[1+k]}`]=await JSON.parse(temp[3+k]);
        }
    }
    key+=json.totalnodes;
    json["find"]=JSON.parse(array[key+1]);
    return json;

    
}