document.getElementById("submit").onclick = main;
// network.on('click', function(properties) {
//     var ids = properties.nodes;
//     // var clickedNodes = nodes.get(ids);
//  });
function main()
{
    const readfile=new Promise((resolve,reject)=>
    {
        let data={};
        let fileInput=document.getElementById('myFile');
        let input=fileInput;
        let reader = new FileReader();
        if (input.files.length>0) {
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
                data[i]={"positionX":0,"positionY":0,"nodeTo":[]}
                data[i].positionX=JSON.parse(array[key+i].split('\t')[1]);
                data[i].positionY=JSON.parse(array[key+i].split('\t')[2]);
            }
            key+=data.totalnodes+1;
            for(let i=0;i<=data.totalnodes;i++)
            {
                let temp=array[key+i].split('\t');
                for(let j=0,k=0;j<temp[0];j++,k+=4)
                {
                    data[i].nodeTo[j]={"to":0,"cost":0};
                    data[i].nodeTo[j].to=temp[1+k];
                    data[i].nodeTo[j].cost=((JSON.parse(temp[3+k]))/10000000).toFixed(1);
                }
            }
            key+=data.totalnodes;
            data["find"]=JSON.parse(array[key+1]);
            resolve(data);
        });
        } else {
            reject();
        } 
    });
    readfile.then(
        (data)=>
        {
            MakeGraph(data);
        },
        ()=>
        {
            alert('Please upload a file before continuing');
        }
    )
}
