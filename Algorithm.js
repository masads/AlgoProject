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
        physics: (gtype=="directed") ? false:false,
        edges: {

            width: 1
          },
    };
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
                setTimeout(() => {
                    edges.add([{id:`${k++}`,from:`${i}`, to: `${graphData[i].nodeTo[j].to}`,arrows: arrowOrNot,label: `${graphData[i].nodeTo[j].cost}`,}]);
                }, 100*k);
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

                if(graphData[i].nodeTo[j].to!=i ){
                    let flag=0;
                    let u=i,v=graphData[i].nodeTo[j].to,w=graphData[i].nodeTo[j].cost;
                    for(let i=0;i<g.adjacencylist[v].length;i++){
                        if(g.adjacencylist[v][i].v==u && g.adjacencylist[v][i].u==v && g.adjacencylist[v][i].weight>=w)
                        {
                            flag=1;
                            break;
                        }else if(g.adjacencylist[v][i].v==u && g.adjacencylist[v][i].u==v && g.adjacencylist[v][i].weight<w)
                        {
                            flag=1;
                            break;
                        }
                    }
                    if(flag==0)
                    {
                        g.addEdge(i.toString(),graphData[i].nodeTo[j].to,graphData[i].nodeTo[j].cost);
                    }
                }
        }
    }
    for(let i=0;i<g.adjacencylist.length;i++)
    {
        if(g.adjacencylist[i].length!=0)
        {
            let find=[];
            let arr=[];
            for(let j=0;j<g.adjacencylist[i].length;j++)
            {
                if(arr[g.adjacencylist[i][j].v]==undefined)
                {
                    arr[g.adjacencylist[i][j].v]=1;
                }else
                {
                    find.push({index:j,value:g.adjacencylist[i][j]});
                }
            }
            for(let j=0;j<find.length;j++)
            {
                for(let k=0;k<g.adjacencylist[i].length;k++)
                {
                    let flag=0;
                    if(g.adjacencylist[i][k]!=undefined)
                    {
                        if(find[j].value.v==g.adjacencylist[i][k].v)
                        {   
                            if(find[j].value.weight>g.adjacencylist[i][k].weight)
                            {
                                
                                delete g.adjacencylist[i][find[j].index];
                                
                            }else
                            {
                                delete g.adjacencylist[i][k];
                                
                            }
                            flag =1;
                        }
                    }
                    if(flag ==1)
                    {
                        break;
                    }
                }
            }
            let temp=[];
            let tempi=0;
            for(let j=0;j<g.adjacencylist[i].length;j++){
                if(g.adjacencylist[i][j]!=undefined){
                    temp[tempi]=g.adjacencylist[i][j];
                    tempi++;
                }
            }
            g.adjacencylist[i]=temp;
        }
    }
    console.log(g.adjacencylist);
    k=1;
    for(i=0;i<g.adjacencylist.length;i++)
    {
        if(g.adjacencylist[i].length!=0)
        {
            for(let j=0;j<g.adjacencylist[i].length;j++)
            {
                edges1.add([{id:`${k}`,from:`${i}`, to: `${g.adjacencylist[i][j].v}`,arrows: arrowOrNot,label: `${g.adjacencylist[i][j].weight}`,}]);
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
    console.log(result);
    k=1;
    for(i=0;i<g.adjacencylist.length;i++)
    {
        if(g.adjacencylist[i].length!=0)
        {
            for(let j=0;j<g.adjacencylist[i].length;j++)
            {
                for(let l=0;l<result.length;l++)
                {
                    if(result[l].parent==i && l==g.adjacencylist[i][j].v)
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
