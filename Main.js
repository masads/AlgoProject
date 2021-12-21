let nodes,edges,network,graphData,options,VisData;
let container=document.getElementById("mynetwork");
document.getElementById("apply").onclick=apply;
let arrowOrNot=""
function MakeGraph(data)
{
    graphData=data;
    nodes = new vis.DataSet();
    for(let i=0;i<graphData.totalnodes;i++)
    {
        nodes.add([{id:`${i}`,label:`Node ${i}`,x:`${graphData[i].positionX*1500}`,y:`${graphData[i].positionY*1500}`}]);
    }
    edges = new vis.DataSet();
    VisData = {
        nodes: nodes,
        edges: edges,
    };
    options = { 
        physics: false,
        edges: {
            width: 2
          },
    };
    network = new vis.Network(container, VisData, options);
    const algo=document.getElementById("showAlgo").value;
    if(algo=="Dijkstra" || algo=="Bellman Ford" || algo=="Floyd Warshall")
    {
        arrowOrNot="to";
    }else
    {
        arrowOrNot="";
    }
    for(let i=0;i<graphData.totalnodes;i++)
    {
        for(let j=0;j<Object.keys(graphData[i].nodeTo).length;j++)
        {
            if(arrowOrNot=="to")
            {
                setTimeout(() => {
                edges.add([{from:`${i}`, to: `${graphData[i].nodeTo[j].to}`,label: `${graphData[i].nodeTo[j].cost}`,arrows:arrowOrNot,smooth: {type: 'curvedCW', roundness: 0.1}}]);
                }, 10*i);
            }
            else
            {
                
                if(graphData[i].nodeTo[j].to>i)
                {
                    setTimeout(() => {
                    edges.add([{from:`${i}`, to: `${graphData[i].nodeTo[j].to}`,label: `${graphData[i].nodeTo[j].cost}`,arrows:arrowOrNot}]);
                    }, 10*i);
                }
            }
        }
    }
}
function apply()
{
    const algo=document.getElementById("showAlgo").value;
    if(algo=="Prims")
    {
        Prims();
    }
    else if(algo=="Kruskal")
    {
        kruskal();
    }
    else if(algo=="Dijkstra")
    {
        Dijkstra();
    }else if(algo=="Bellman Ford")
    {
        BellmanFord();
    }else if(algo=="Floyd Warshall")
    {
        console.log("floyd")
        Floyd();
    }else if(algo=="Boruvka's")
    {
        Boruvka();
    }
}
function Prims()
{
    let g = new Graph(graphData.totalnodes);

    for(let i=0;i<graphData.totalnodes;i++)
    {
        for(let j=0;j<Object.keys(graphData[i].nodeTo).length;j++)
        {
                g.addEdge(i,parseInt(graphData[i].nodeTo[j].to),parseFloat(graphData[i].nodeTo[j].cost));
        }
    }
    let result = g.MakePrims();
    for (let id in VisData.edges._data  ) {
        for(let j=0;j<result.length;j++)
        {
            let u=result[j].to;
            let v=result[j].from;
            if(v<u)
            {
                let temp=u;
                u=v;
                v=temp
            }
             if(u==VisData.edges._data[`${id}`].from && v==VisData.edges._data[`${id}`].to)
            {
                setTimeout(() => {
                VisData.edges._data[`${id}`]["color"]={color:'red'};
                network = new vis.Network(container, VisData, options);
                }, 10*j);
            }
        }
    }
    let sum=0;
    for(let j=0;j<result.length;j++)
    {
        sum+=result[j].cost;
    }
    document.getElementById("cost").innerText=sum;
}

function kruskal()
{
    let g = new Graph(graphData.totalnodes);
    for(let i=0;i<graphData.totalnodes;i++)
    {
        for(let j=0;j<Object.keys(graphData[i].nodeTo).length;j++)
        {
                g.addEdge(i,parseInt(graphData[i].nodeTo[j].to),parseFloat(graphData[i].nodeTo[j].cost));
        }
    }
    let result = g.MakeKruskal();
    console.log(result);
    for (let id in VisData.edges._data  ) {
        for(let j=0;j<result.length;j++)
        {
            let u=result[j].to;
            let v=result[j].from;
            if(v<u)
            {
                let temp=u;
                u=v;
                v=temp
            }
             if(u==VisData.edges._data[`${id}`].from && v==VisData.edges._data[`${id}`].to)
            {
                setTimeout(() => {
                VisData.edges._data[`${id}`]["color"]={color:'red'};
                network = new vis.Network(container, VisData, options);
                }, 10*j);
            }
        }
    }
    document.getElementById("cost").innerText=result[result.length - 1].cost;
}

function Dijkstra()
{
    let g = new Graph(graphData.totalnodes);
    let from=document.getElementById("from").value=graphData.find;
    const to=document.getElementById("to").value;
    console.log(to)
    if(from<0 || from>graphData.totalnodes)
    {
        alert('Please Enter correct value of "from"');
    }
    if(to<0 || to>graphData.totalnodes)
    {
        alert('Please Enter correct value of "to"');
    }
    for(let i=0;i<graphData.totalnodes;i++)
    {
        for(let j=0;j<Object.keys(graphData[i].nodeTo).length;j++)
        {
            g.addEdge(i,parseInt(graphData[i].nodeTo[j].to),parseFloat(graphData[i].nodeTo[j].cost));
        }
    }
    let result = g.MakeDijkstra(graphData.find);
    console.log(result);
    let sum=0;
    for (let id in VisData.edges._data  ) {
        for(let j=0;j<result[to].length-1;j++)
        {
            let u=result[to][j];
            let v=result[to][j+1];

             if(u==VisData.edges._data[`${id}`].from && v==VisData.edges._data[`${id}`].to)
            {
                setTimeout(() => {
                VisData.edges._data[`${id}`]["color"]={color:'red'};
                network = new vis.Network(container, VisData, options);
                }, 10*j);
                sum+=parseFloat(VisData.edges._data[`${id}`]["label"]);
            }
        }
    }
    document.getElementById("cost").innerText=sum;
}

function BellmanFord()
{
    let g = new Graph(graphData.totalnodes);
    let from=document.getElementById("from").value=graphData.find;
    const to=document.getElementById("to").value;
    console.log(to)
    if(from<0 || from>graphData.totalnodes)
    {
        alert('Please Enter correct value of "from"');
    }
    if(to<0 || to>graphData.totalnodes)
    {
        alert('Please Enter correct value of "to"');
    }
    for(let i=0;i<graphData.totalnodes;i++)
    {
        for(let j=0;j<Object.keys(graphData[i].nodeTo).length;j++)
        {
            g.addEdge(i,graphData[i].nodeTo[j].to,graphData[i].nodeTo[j].cost);
        }
    }
    console.log(graphData.find);
    let result = g.MakeBellman(graphData.find);
    console.log(result);
    for (let id in VisData.edges._data  ) {
        for(let j=0;j<result[to].length-1;j++)
        {
            let u=result[to][j];
            let v=result[to][j+1];

             if(u==VisData.edges._data[`${id}`].from && v==VisData.edges._data[`${id}`].to)
            {
                console.log(u+"--"+v);
                setTimeout(() => {
                VisData.edges._data[`${id}`]["color"]={color:'red'};
                network = new vis.Network(container, VisData, options);
                }, 10*j);
                break;
            }
        }
    }
    document.getElementById("cost").innerText=result[result.length-1][to];
}

function Floyd()
{
    let g = new Graph(graphData.totalnodes);
    let from=document.getElementById("from").value=graphData.find;
    const to=document.getElementById("to").value;
    if(from<0 || from>graphData.totalnodes)
    {
        alert('Please Enter correct value of "from"');
    }
    if(to<0 || to>graphData.totalnodes)
    {
        alert('Please Enter correct value of "to"');
    }

    for(let i=0;i<graphData.totalnodes;i++)
    {
        for(let j=0;j<Object.keys(graphData[i].nodeTo).length;j++)
        {
            g.addEdge(i,graphData[i].nodeTo[j].to,graphData[i].nodeTo[j].cost);
        }
    }
    let result = g.MakeFloyd(graphData.find,to);
    console.log(result);
    let sum=0;
    for (let id in VisData.edges._data  ) {
        for(let j=0;j<result.length-1;j++)
        {
            let u=result[j];
            let v=result[j+1];

             if(u==VisData.edges._data[`${id}`].from && v==VisData.edges._data[`${id}`].to)
            {
                setTimeout(() => {
                VisData.edges._data[`${id}`]["color"]={color:'red'};
                network = new vis.Network(container, VisData, options);
                }, 10*j);
                sum+=parseFloat(VisData.edges._data[`${id}`]["label"]);
                break;
            }
        }
    }
    document.getElementById("cost").innerText=sum;

}

function Boruvka()
{
    let g = new Graph(graphData.totalnodes);
    for(let i=0;i<graphData.totalnodes;i++)
    {
        for(let j=0;j<Object.keys(graphData[i].nodeTo).length;j++)
        {
                g.addEdge(i,parseInt(graphData[i].nodeTo[j].to),parseFloat(graphData[i].nodeTo[j].cost));
        }
    }
    let result = g.MakeBoruka();
    console.log(result);
    for (let id in VisData.edges._data  ) {
        for(let j=0;j<result.length-1;j++)
        {
            let u=result[j].to;
            let v=result[j].from;
            if(u==-1 && v==-1){continue;}
            if(v<u)
            {
                let temp=u;
                u=v;
                v=temp
            }
             if(u==VisData.edges._data[`${id}`].from && v==VisData.edges._data[`${id}`].to)
            {
                result[j].to=-1;
                result[j].from=-1;
                setTimeout(() => {
                VisData.edges._data[`${id}`]["color"]={color:'red'};
                VisData.edges._data[`${id}`].hidden = false;
                network = new vis.Network(container, VisData, options);
                }, 10*j);
            }
        }
    }
    document.getElementById("cost").innerText=result[result.length - 1].cost;
}