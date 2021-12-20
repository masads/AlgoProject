let nodes,edges,network,graphData,options,VisData;
let container=document.getElementById("mynetwork");
document.getElementById("apply").onclick=apply;

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
    // if(gtype=="directed")
    // {
    //     arrowOrNot="to";
    // }else
    // {
    //     arrowOrNot="";
    // }
    for(let i=0;i<graphData.totalnodes;i++)
    {
        for(let j=0;j<Object.keys(graphData[i].nodeTo).length;j++)
        {
                setTimeout(() => {
                    edges.add([{from:`${i}`, to: `${graphData[i].nodeTo[j].to}`,label: `${graphData[i].nodeTo[j].cost}`,}]);
                }, 100*i);
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
    }
}
function Prims()
{
    let g = new Graph(graphData.totalnodes);
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
            width: 4
          },
    };
    network = new vis.Network(container, VisData, options);
    for(let i=0;i<graphData.totalnodes;i++)
    {
        for(let j=0;j<Object.keys(graphData[i].nodeTo).length;j++)
        {
            if(graphData[i].nodeTo[j].to>i)
            {
                edges.add([{from:`${i}`, to: `${graphData[i].nodeTo[j].to}`,label: `${graphData[i].nodeTo[j].cost}`,}]);
                g.addEdge(i,graphData[i].nodeTo[j].to,graphData[i].nodeTo[j].cost);
            }
        }
    }
    let result = g.MakePrims();
    for (let id in VisData.edges._data  ) {
        for(let j=0;j<result.length;j++)
        {
             if(result[j].from==VisData.edges._data[`${id}`].from && result[j].to==VisData.edges._data[`${id}`].to)
            {
                setTimeout(() => {
                VisData.edges._data[`${id}`]["color"]={color:'red'};
                network = new vis.Network(container, VisData, options);
                }, 1000*j);
            }
        }
    }
}

function kruskal()
{
    let g = new Graph(graphData.totalnodes);
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
            width: 4
          },
    };
    network = new vis.Network(container, VisData, options);
    for(let i=0;i<graphData.totalnodes;i++)
    {
        for(let j=0;j<Object.keys(graphData[i].nodeTo).length;j++)
        {
            if(graphData[i].nodeTo[j].to>i)
            {
                edges.add([{from:`${i}`, to: `${graphData[i].nodeTo[j].to}`,label: `${graphData[i].nodeTo[j].cost}`,}]);
                g.addEdge(i,graphData[i].nodeTo[j].to,graphData[i].nodeTo[j].cost);
            }
        }
    }
    let result = g.MakeKruskal();
    for (let id in VisData.edges._data  ) {
        for(let j=0;j<result.length;j++)
        {
             if(result[j].from==VisData.edges._data[`${id}`].from && result[j].to==VisData.edges._data[`${id}`].to)
            {
                setTimeout(() => {
                VisData.edges._data[`${id}`]["color"]={color:'red'};
                network = new vis.Network(container, VisData, options);
                }, 1000*j);
            }
        }
    }
}

function Dijkstra()//issue
{
    console.log("aa")
    let g = new Graph(graphData.totalnodes);
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
            width: 4
          },
    };
    network = new vis.Network(container, VisData, options);
    for(let i=0;i<graphData.totalnodes;i++)
    {
        for(let j=0;j<Object.keys(graphData[i].nodeTo).length;j++)
        {
            if(graphData[i].nodeTo[j].to>i)
            {
                edges.add([{from:`${i}`, to: `${graphData[i].nodeTo[j].to}`,label: `${graphData[i].nodeTo[j].cost}`,}]);
                g.addEdge(i,graphData[i].nodeTo[j].to,graphData[i].nodeTo[j].cost);
            }
        }
    }
    let result = g.MakeDijkstra(0);
    console.log(result);
    // for (let id in VisData.edges._data  ) {
    //     for(let j=0;j<result.length;j++)
    //     {
    //          if(result[j].from==VisData.edges._data[`${id}`].from && result[j].to==VisData.edges._data[`${id}`].to)
    //         {
    //             setTimeout(() => {
    //             VisData.edges._data[`${id}`]["color"]={color:'red'};
    //             network = new vis.Network(container, VisData, options);
    //             }, 1000*j);
    //         }
    //     }
    // }
}