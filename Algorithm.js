var nodes, edges, network,graphData,data1,edges1;
let k;
var container = document.getElementById("mynetwork");
var options
document.getElementById("apply").onclick = apply;
let arrowOrNot="";
function graph(data) {
    graphData=data;
    nodes = new vis.DataSet();
    for(let i=0;i<graphData.totalnodes;i++)
    {

        nodes.add([{id:`${i}`,label:`Node ${i}`,x:`${graphData[i].positionX*1500}`,y:`${graphData[i].positionY*1500}`,arrow:"arrow"}]);
            
    }
    edges = new vis.DataSet();
    data1 = {
        nodes: nodes,
        edges: edges,
    };
    const gtype=document.getElementById("showgraph").value; 
    options = { 
        physics: (gtype=="directed") ? false:true,
        edges: {

            width: 1
          },
        
    };
    console.log(arrowOrNot);
    network = new vis.Network(container, data1, options);
    k=1;
    if(gtype=="directed")
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
                
                edges.add([{id:`${k}`,from:`${i}`, to: `${graphData[i].nodeTo[j].to}`,arrows: arrowOrNot,label: `${graphData[i].nodeTo[j].cost}`,}]);
                k++;

        }
    }


}

function apply()
{
    const algo=document.getElementById("showAlgo").value;
    if(algo=="Prims")
    {
        Prims();
    }else if(algo=="Kruskal")
    {
        Kruskal();
    }
}
function Kruskal()
{
    
}
function Prims()
{
    let g =new Graph(graphData.totalnodes);
    k=1;
    const gtype=document.getElementById("showgraph").value;
    if(gtype=="directed")
    {
        arrowOrNot="to";
    }else
    {
        arrowOrNot="";
    }
    edges1 = new vis.DataSet();
    for(let i=0;i<graphData.totalnodes;i++)
    {
        for(let j=0;j<Object.keys(graphData[i].nodeTo).length;j++)
        {
            if(graphData[i].nodeTo[j].to>i)
            {
                
                g.addEdge(i,graphData[i].nodeTo[j].to,graphData[i].nodeTo[j].cost);
                edges1.add([{id:`${k}`,from:`${i}`, to: `${graphData[i].nodeTo[j].to}`,arrows: arrowOrNot,label: `${graphData[i].nodeTo[j].cost}`,}]);
                k++;
            }
        }
    }
    let data2={
        nodes: nodes,
        edges: edges1,
    };
    data1=data2;
    network = new vis.Network(container, data1, options);
    let result=g.primMST();
    k=1;
    for(let i=0;i<graphData.totalnodes;i++)
    {
        for(let j=0;j<Object.keys(graphData[i].nodeTo).length;j++)
        {
            if(graphData[i].nodeTo[j].to>i)
            { 
                for(let l=0;l<result.length;l++)
                {
                    
                    if(result[l].parent==data1.edges._data[`${k}`].from && l==data1.edges._data[`${k}`].to)
                    {
                        data1.edges._data[`${k}`]["color"]={color:'red'};
                    }
                }
                k++;
            }
        }
    }
    network = new vis.Network(container, data1, options);
}
