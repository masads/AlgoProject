class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjacencylist = [];
    for (let i = 0; i < this.vertices; ++i) {
      this.adjacencylist.push([]);
    }
  }
  addEdge(u, v, weight) {
    this.adjacencylist[u].push({ to: v, weight: weight });
  }
  printGraph() {
    console.log(this.adjacencylist);
    for (let i = 0; i < this.vertices; ++i) {
      console.log(" \n [" + i + "] :");
      for (let j = 0; j < this.adjacencylist[i].length; ++j) {
        console.log("  " + this.adjacencylist[i][j].to);
      }
    }
  }
  primMST(graph) {
    let length = graph.length;
    let minKey = (key, mstSet, length) => {
      // Initialize min value
      let min = Number.MAX_VALUE,
        min_index;

      for (let v = 0; v < length; v++)
        if (mstSet[v] == false && key[v] < min) (min = key[v]), (min_index = v);

      return min_index;
    };

    // Array to store constructed MST
    let parent = [];

    // Key values used to pick minimum weight edge in cut
    let key = [];

    // To represent set of vertices included in MST
    let mstSet = [];

    // Initialize all keys as INFINITE
    for (let i = 0; i < length; i++)
      (key[i] = Number.MAX_VALUE), (mstSet[i] = false);

    // Always include first 1st vertex in MST.
    // Make key 0 so that this vertex is picked as first vertex.
    key[0] = 0;
    parent[0] = -1; // First node is always root of MST

    // The MST will have V vertices
    for (let count = 0; count < length - 1; count++) {
      // Pick the minimum key vertex from the
      // set of vertices not yet included in MST
      let u = minKey(key, mstSet, length);

      // Add the picked vertex to the MST Set
      mstSet[u] = true;

      // Update key value and parent index of
      // the adjacent vertices of the picked vertex.
      // Consider only those vertices which are not
      // yet included in MST
      for (let v = 0; v < length; v++)
        // graph[u][v] is non zero only for adjacent vertices of m
        // mstSet[v] is false for vertices not yet included in MST
        // Update the key only if graph[u][v] is smaller than key[v]
        if (graph[u][v] && mstSet[v] == false && graph[u][v] < key[v])
          (parent[v] = u), (key[v] = graph[u][v]);
    }

    // print the constructed MST
    let result = [];
    for (let i = 1; i < length; i++) {
      result.push({ from: parent[i], to: i, cost: graph[parent[i]][i] });
    }
    return result;
  }
  kruskalMST(cost) {
    let V = cost.length;
    let result = [];
    let INF = 100000000;
    var parent = Array(V).fill(0);
    let mincost = 0; // Cost of min MST.
    let find = (i) => {
      while (parent[i] != i) i = parent[i];
      return i;
    };
    let union1 = (i, j) => {
      let a = find(i);
      let b = find(j);
      parent[a] = b;
    };
    // Initialize sets of disjoint sets.
    for (let i = 0; i < V; i++) parent[i] = i;

    // Include minimum weight edges one by one
    let edge_count = 0;
    while (edge_count < V - 1) {
      let min = INF,
        a = -1,
        b = -1;
      for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
          if (find(i) != find(j) && cost[i][j] < min) {
            min = cost[i][j];
            a = i;
            b = j;
          }
        }
      }

      union1(a, b);
      edge_count++;
      result.push({ from: a, to: b, cost: min });
      mincost += min;
    }
    console.log(`<br> Minimum cost= ${mincost} <br>`);
    return result;
  }
  minDistance(dist, sptSet, V) {
    // Initialize min value
    let min = Number.MAX_VALUE;
    let min_index = -1;

    for (let v = 0; v < V; v++) {
      if (sptSet[v] == false && dist[v] <= min) {
        min = dist[v];
        min_index = v;
      }
    }
    return min_index;
  }
  DprintPath(parent, j) {
    // Base Case : If j is source
    if (parent[j] == -1) return -1;

    let res = this.DprintPath(parent, parent[j]);
    let path = [j];
    for (let i = 0; i < res.length; i++) {
      path.push(res[i]);
    }
    return path;
  }
  DprintSolution(dist, V, parent, src) {
    let path = [];
    for (let i = 0; i < V; i++) {
      path.push([]);
    }
    console.log(path);
    console.log("Vertex \t\t Distance from Source<br>");
    for (let i = 0; i < V; i++) {
      console.log(src + "->" + i + " \t\t " + dist[i] + "<br>" + src);
      let res = this.DprintPath(parent, i);
      path[i].push(src);
      if (res != -1) {
        path[i] = [...res, src];
      }
      path[i] = path[i].reverse();
    }
    return path;
  }
  dijkstra(graph, src) {
    let INF=1000000;
    let V = graph.length;
    let dist = new Array(V);
    let sptSet = new Array(V);
    let parent = new Array(V);
    // Initialize all distances as
    // INFINITE and stpSet[] as false
    for (let i = 0; i < V; i++) {
      dist[i] = INF;
      sptSet[i] = false;
      // path[i]=[];
    }

    // Distance of source vertex
    // from itself is always 0
    dist[src] = 0;
    parent[src] = -1;
    // Find shortest path for all vertices
    for (let count = 0; count < V - 1; count++) {
      // Pick the minimum distance vertex
      // from the set of vertices not yet
      // processed. u is always equal to
      // src in first iteration.
      let u = this.minDistance(dist, sptSet, V);

      // Mark the picked vertex as processed
      sptSet[u] = true;

      // Update dist value of the adjacent
      // vertices of the picked vertex.
      for (let v = 0; v < V; v++) {
        // Update dist[v] only if is not in
        // sptSet, there is an edge from u
        // to v, and total weight of path
        // from src to v through u is smaller
        // than current value of dist[v]
        if (
          !sptSet[v] &&
          graph[u][v] != 0 &&
          dist[u] != Number.MAX_VALUE &&
          dist[u] + graph[u][v] < dist[v]
        ) {
          parent[v] = u;
          dist[v] = dist[u] + graph[u][v];
        }
      }
    }

    // Print the constructed distance array
    return this.DprintSolution(dist, V, parent, src);
  }
  BprintPath(parent, vertex, source, j) {
    if (vertex < 0 || j > 20) {
      return [];
    }

    let res = this.BprintPath(parent, parent[vertex], source, ++j);
    if (vertex != source) {
    }
    let path = [vertex];
    for (let i = 0; i < res.length; i++) {
      path.push(res[i]);
    }
    return path;
  }
  BellmanFord(graph, V, E, src) {
    // Initialize distance of all vertices as infinite.
    var dis = Array(V).fill(1000000000);
    let parent = new Array(V).fill(-1);
    // initialize distance of source as 0
    dis[src] = 0;

    // Relax all edges |V| - 1 times. A simple
    // shortest path from src to any other
    // vertex can have at-most |V| - 1 edges

    for (var i = 0; i < V - 1; i++) {
      for (var j = 0; j < E; j++) {
        if (
          dis[graph[j][0]] != 1000000000 &&
          dis[graph[j][0]] + graph[j][2] < dis[graph[j][1]]
        ) {
          dis[graph[j][1]] = dis[graph[j][0]] + graph[j][2];
          parent[graph[j][1]] = graph[j][0];
        }
      }
    }

    // check for negative-weight cycles.
    // The above step guarantees shortest
    // distances if graph doesn't contain
    // negative weight cycle. If we get a
    // shorter path, then there is a cycle.
    for (var i = 0; i < E; i++) {
      var x = graph[i][0];
      var y = graph[i][1];
      var weight = graph[i][2];
      if (dis[x] != 1000000000 && dis[x] + weight < dis[y]) {
        console.log("Graph contains negative" + " weight cycle<br>");
      }
    }
    let path = [];
    for (let i = 0; i < V; i++) {
      path.push([]);
    }
    path[0] = [0];
    console.log("Vertex Distance from Source<br>");
    for (var i = 1; i < V; i++) {
      console.log(i + "   " + dis[i] + "  path:");
      path[i] = [...this.BprintPath(parent, i, src, 0)];
      path[i] = path[i].reverse();
    }
    return path;
  }
  constructPath(Next,u, v)
  {
      
      // If there's no path between
      // node u and v, simply return
      // an empty array
      if (Next[u][v] == -1)
          return null;
    
      // Storing the path in a vector
      let path = [];
      path.push(u);
        
      while (u != v)
      {
          u = Next[u][v];
          path.push(u);
      }
      return path;
  }
  floydWarshall(V,dis,Next,u,v)
  {
    let INF =  1000000;
    for(let k = 0; k < V; k++)
    {
        for(let i = 0; i < V; i++)
        {
            for(let j = 0; j < V; j++)
            {
                
                // We cannot travel through
                // edge that doesn't exist
                if (dis[i][k] == INF ||
                    dis[k][j] == INF)
                    continue;
                      
                if (dis[i][j] > dis[i][k] +
                                dis[k][j])
                {
                    dis[i][j] = dis[i][k] +
                                dis[k][j];
                    Next[i][j] = Next[i][k];
                }
            }
        }
    }
    return this.constructPath(Next,u, v)
  }
  Bfind(parent, i) {
    if (parent[i] != i)
      parent[i] = this.Bfind(parent, parent[i]);
    return parent[i];
  }
  BUnion(parent,rank, i, j)
  {
    let iRoot = this.Bfind(parent, i);
    let jRoot = this.Bfind(parent, j);
  
    if (rank[iRoot] < rank[jRoot]) {
      parent[iRoot] = jRoot;
    } else if (rank[iRoot] > rank[jRoot]) {
      parent[jRoot] = iRoot;
    } else {
      parent[jRoot] = iRoot;
      rank[iRoot]++;
    }
  }
  boruvka(V,E,edges)
  {
    let cheapest=[];
    let parent=[];
    let rank=[];
    let result = [];
    for(let i=0;i<V;i++)
    {
      cheapest[i]=-1;
      parent[i]=i;
      rank[i]=0
    }
    let numTrees=V;
    let MSTweight=0;
    while(numTrees>1)
    {
      for(let i=0;i<V;i++)
      {
        cheapest[i]=-1;
      }
      for(let i=0;i<E;i++)
      {
        let set1=this.Bfind(parent,edges[i].u);
        let set2=this.Bfind(parent,edges[i].v)

        if(set1==set2){continue;}
        else
        {
          if (cheapest[set1] == -1 || edges[cheapest[set1]].w > edges[i].w) {
            cheapest[set1] = i;
          }
          if (
            cheapest[set2] == -1 ||
            edges[cheapest[set2]].w > edges[i].w
          ) {
            cheapest[set2] = i;
          }
        }
      }
      for(let i=0;i<V;i++)
      {
        if(cheapest[i]!=-1)
        {
          let set1=this.Bfind(parent,edges[cheapest[i]].u);
          let set2=this.Bfind(parent,edges[cheapest[i]].v);
          if (set1 == set2) {
            continue;
          }
          MSTweight += edges[cheapest[i]].w;
          result.push({ from: edges[cheapest[i]].u, to: edges[cheapest[i]].v, cost: edges[cheapest[i]].w });
          console.log(
            `Edge ${edges[cheapest[i]].u}-${
              edges[cheapest[i]].v
            } included in MST`
          );
          this.BUnion(parent,rank, set1, set2);
          numTrees--;
        }
      }

    }
    console.log("weight of MST:"+MSTweight)
    return result;
  }
  MakePrims() {
    let graph = [];
    for (let i = 0; i < this.vertices; ++i) {
      graph.push([]);
    }
    for (let i = 0; i < this.vertices; ++i) {
      for (let j = 0; j < this.vertices; ++j) {
        graph[i].push(0);
      }
    }
    for (let i = 0; i < this.vertices; ++i) {
      for (let j = 0; j < this.adjacencylist[i].length; ++j) {
        let z = this.adjacencylist[i][j].to;
        graph[i][z] = this.adjacencylist[i][j].weight;
      }
    }
    return this.primMST(graph);
  }
  MakeKruskal() {
    let INF = 100000000;
    let graph = [];
    for (let i = 0; i < this.vertices; ++i) {
      graph.push([]);
    }
    console.log(this.adjacencylist);
    for (let i = 0; i < this.vertices; ++i) {
      for (let j = 0; j < this.vertices; ++j) {
        graph[i].push(INF);
      }
    }
    for (let i = 0; i < this.vertices; ++i) {
      for (let j = 0; j < this.adjacencylist[i].length; ++j) {
        //    console.log("  " + this.adjacencylist[i][j].to);
        let z = this.adjacencylist[i][j].to;
        graph[i][z] = this.adjacencylist[i][j].weight;
      }
    }
    console.log(graph);
    return this.kruskalMST(graph);
  }
  MakeDijkstra(s) {
    let graph = [];
    for (let i = 0; i < this.vertices; ++i) {
      graph.push([]);
    }
    console.log(this.adjacencylist);
    for (let i = 0; i < this.vertices; ++i) {
      for (let j = 0; j < this.vertices; ++j) {
        graph[i].push(0);
      }
    }
    for (let i = 0; i < this.vertices; ++i) {
      for (let j = 0; j < this.adjacencylist[i].length; ++j) {
        let z = this.adjacencylist[i][j].to;
        graph[i][z] = parseInt(this.adjacencylist[i][j].weight);
      }
    }
    console.log(graph);
  //   let graph = [ 
  //     [ 0, 4, 0, 0, 0, 0, 0, 8, 0 ],
  //     [ 4, 0, 8, 0, 0, 0, 0, 11, 0 ],
  //     [ 0, 8, 0, 7, 0, 4, 0, 0, 2 ],
  //     [ 0, 0, 7, 0, 9, 14, 0, 0, 0 ],
  //     [ 0, 0, 0, 9, 0, 10, 0, 0, 0 ],
  //     [ 0, 0, 4, 14, 10, 0, 2, 0, 0 ],
  //     [ 0, 0, 0, 0, 0, 2, 0, 1, 6 ],
  //     [ 8, 11, 0, 0, 0, 0, 1, 0, 7 ],
  //     [ 0, 0, 2, 0, 0, 0, 6, 7, 0 ] 
  // ];

    return this.dijkstra(graph, s);
  }
  MakeBellman(src) {
    let graph = [];
    console.log(this.adjacencylist);
    for (let i = 0; i < this.adjacencylist.length; i++) {
      for (let j = 0; j < this.adjacencylist[i].length; j++) {
        graph.push([
          i,
          this.adjacencylist[i][j].to,
          this.adjacencylist[i][j].weight,
        ]);
      }
    }
    // var graph = [
    //         [ 0, 1, -1 ],
    //         [ 0, 2, 4 ],
    //         [ 1, 2, 3 ],
    //         [ 1, 3, 2 ],
    //         [ 1, 4, 2 ],
    //         [ 3, 2, 5 ],
    //         [ 3, 1, 1 ],
    //         [ 4, 3, -3 ]];
    return this.BellmanFord(graph, this.vertices, graph.length, src);
  }
  MakeFloyd(u,v)
  {
    let INF =  1000000;
    let MAXN = 100;
    let V = this.vertices;
    let graph = [];
    for (let i = 0; i < this.vertices; ++i) {
      graph.push([]);
    }
    console.log(this.adjacencylist);
    for (let i = 0; i < this.vertices; ++i) {
      for (let j = 0; j < this.vertices; ++j) {
        if(i==j) {
          graph[i].push(0);
        }else
        {
          graph[i].push(INF);
        } 
      }
    }
    // console.log(this.adjacencylist)
    for (let i = 0; i < this.vertices; ++i) {
      for (let j = 0; j < this.adjacencylist[i].length; ++j) {
        //    console.log("  " + this.adjacencylist[i][j].to);
        let z = this.adjacencylist[i][j].to;
        graph[i][z] = this.adjacencylist[i][j].weight;
      }
    }
    // let graph = [ [ 0, 3, INF, 7 ],
    //             [ 8, 0, 2, INF ],
    //             [ 5, INF, 0, 1 ],
    //             [ 2, INF, INF, 0 ] ];
    let dis = new Array(MAXN);
    let Next = new Array(MAXN);
    for(let i = 0; i < MAXN; i++)
    {
        dis[i] = new Array(MAXN);
        Next[i] = new Array(MAXN);
    }            
    for(let i = 0; i < V; i++)
    {
        for(let j = 0; j < V; j++)
        {
            dis[i][j] = graph[i][j];
            if (graph[i][j] == INF)
                Next[i][j] = -1;
            else
                Next[i][j] = j;
        }
    }
    return this.floydWarshall(V,dis,Next,u,v)
  }
  MakeBoruka()
  {
    let graph = [];
    for (let i = 0; i < this.vertices; ++i) {
      graph.push([]);
    }
    console.log(this.adjacencylist);
    for (let i = 0; i < this.vertices; ++i) {
      for (let j = 0; j < this.vertices; ++j) {
        graph[i].push(0);
      }
    }
    for (let i = 0; i < this.vertices; ++i) {
      for (let j = 0; j < this.adjacencylist[i].length; ++j) {
        let z = this.adjacencylist[i][j].to;
        graph[i][z] = this.adjacencylist[i][j].weight;
      }
    }
    console.log(graph);
    // let graph=[
    //   [0,10,6,5],
    //   [0,0,0,15],
    //   [0,0,0,4],
    //   [0,0,0,0]
    // ];
    let E=0;
    let edges=[]
    for(let i=0; i<graph.length; i++)
    {
      for(let j=0; j<graph[i].length; j++)
      {
        if(graph[i][j]!=0){E++;edges.push({u:i,v:j,w:graph[i][j]})}
      }
    }
    console.log(edges)
    return this.boruvka(graph,this.vertices,E,edges);
  }
}
