class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjacencylist = [];
        for (let i = 0; i < this.vertices; ++i)
        {
            this.adjacencylist.push([]);
        }
    }
    addEdge(u, v, weight) {
      this.adjacencylist[u].push({ to: v, weight: weight });
    }
    printGraph() {
        console.log(this.adjacencylist)
        for (let i = 0; i < this.vertices; ++i)
        {
           console.log(" \n [" + i + "] :");
            for (let j = 0; j < this.adjacencylist[i].length; ++j)
            {
               console.log("  " + this.adjacencylist[i][j].to);
            }
        }
    }
    primMST(graph,s)
    {
        let length=graph.length;
        let minKey=(key, mstSet,length)=>
        {
            // Initialize min value
            let min = Number.MAX_VALUE, min_index;
        
            for (let v = 0; v < length; v++)
                if (mstSet[v] == false && key[v] < min)
                    min = key[v], min_index = v;
        
            return min_index;
        }
        
        // Array to store constructed MST
        let parent = [];
        
        // Key values used to pick minimum weight edge in cut
        let key = [];
        
        // To represent set of vertices included in MST
        let mstSet = [];
    
        // Initialize all keys as INFINITE
        for (let i = 0; i < length; i++)
            key[i] = Number.MAX_VALUE, mstSet[i] = false;
    
        // Always include first 1st vertex in MST.
        // Make key 0 so that this vertex is picked as first vertex.
        key[0] = 0;
        console.log(s)
        parent[s] = -1; // First node is always root of MST
    
        // The MST will have V vertices
        for (let count = 0; count < length - 1; count++)
        {
            // Pick the minimum key vertex from the
            // set of vertices not yet included in MST
            let u = minKey(key, mstSet,length);
    
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
                    parent[v] = u, key[v] = graph[u][v];
        }
    
        // print the constructed MST
        let result=[];
        for (let i = 1; i < length; i++)
        {
            result.push({from:parent[i], to:i,cost:graph[parent[i]][i]})
        }
        return result;
    }
    kruskalMST(cost)
    {
        let V=5
        let result=[];
        let INF=100000000;
        var parent = Array(V).fill(0);
        let mincost = 0; // Cost of min MST.
        let find=(i)=>
        {
            while (parent[i] != i)
                i = parent[i];
            return i;
        }
        let union1=(i, j)=>
        {
            let a = find(i);
            let b = find(j);
            parent[a] = b;
        }
        // Initialize sets of disjoint sets.
        for (let i = 0; i < V; i++)
            parent[i] = i;
    
        // Include minimum weight edges one by one
        let edge_count = 0; 
        while (edge_count < V - 1)
        {
            let min = INF, a = -1, b = -1;
            for (let i = 0; i < V; i++)
            {
                for (let j = 0; j < V; j++)
                {
                    if (find(i) != find(j) && cost[i][j] < min)
                    {
                        min = cost[i][j];
                        a = i;
                        b = j;
                    }
                    
                }
                
            }
    
            union1(a, b);
            edge_count++;
            result.push({from:a, to:b,cost:min})
            mincost += min;
        }
        console.log(`<br> Minimum cost= ${mincost} <br>`);
        return result;
    }




    MakePrims(s)
    {
        
        let graph = []
        for (let i = 0; i < this.vertices; ++i)
        {
            graph.push([]);
        }
        console.log(this.adjacencylist)
        for (let i = 0; i < this.vertices; ++i)
        {
            for (let j = 0; j <this.vertices; ++j)
            {
                graph[i].push(0)
            }
        }
        for (let i = 0; i < this.vertices; ++i)
        {
            for (let j = 0; j < this.adjacencylist[i].length; ++j)
            {
            //    console.log("  " + this.adjacencylist[i][j].to);
               let z=this.adjacencylist[i][j].to;
             graph[i][z]=this.adjacencylist[i][j].weight;
            }
        }
        console.log(graph);
        return this.primMST(graph,s);
    }
    MakeKruskal()
    {
        let INF=100000000;
        let graph = []
        for (let i = 0; i < this.vertices; ++i)
        {
            graph.push([]);
        }
        console.log(this.adjacencylist)
        for (let i = 0; i < this.vertices; ++i)
        {
            for (let j = 0; j <this.vertices; ++j)
            {
                graph[i].push(INF)
            }
        }
        for (let i = 0; i < this.vertices; ++i)
        {
            for (let j = 0; j < this.adjacencylist[i].length; ++j)
            {
            //    console.log("  " + this.adjacencylist[i][j].to);
               let z=this.adjacencylist[i][j].to;
             graph[i][z]=this.adjacencylist[i][j].weight;
            }
        }
        console.log("-")
        console.log(graph);
        return this.kruskalMST(graph);
    }

}
