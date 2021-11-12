document.getElementById("submit").onclick = readfile;
let data={};

function readfile()
{
    let fileInput=document.getElementById('myFile');
    let input=fileInput;
    let reader = new FileReader();
    if (input.files.length) {
        let textFile = input.files[0];
        reader.readAsText(textFile);
        reader.addEventListener('load', (event) => {
        const arr = event.target.result;
        const array=arr.toString().split('\n');
        let key=2;
        data.totalnodes=(JSON.parse(array[key]));
        key+=2;
        for(let i=0;i<data.totalnodes;i++)
        {
          data[`node${i}`]={"positionX":0,"positionY":0,"nodeTo":{}}
          data[`node${i}`].positionX=JSON.parse(array[key+i].split('\t')[1]);
          data[`node${i}`].positionY=JSON.parse(array[key+i].split('\t')[2]);
        }
        key+=data.totalnodes+1;
        for(let i=0;i<=data.totalnodes;i++)
        {
            let temp=array[key+i].split('\t');
            for(let j=0,k=0;j<temp[0];j++,k+=4)
            {
              data[`node${i}`].nodeTo[`node${temp[1+k]}`]=JSON.parse(temp[3+k]);
            }
        }
        key+=data.totalnodes;
        data["find"]=JSON.parse(array[key+1]);
    });
    } else {
        alert('Please upload a file before continuing')
    } 
}