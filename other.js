class Edge
{
    constructor(u, v, weight)
    {
        this.u = u;
        this.v = v;
        this.weight = weight;
    }
}
class HeapNode
{
    constructor()
    {
        this.vertex = 0;
        this.key = 0;
    }
}
class ResultSet
{
    constructor()
    {
        this.parent = 0;
        this.weight = 0;
    }
}
class MinHeap
{
    constructor(capacity)
    {
        this.capacity = capacity;
        this.node = Array(capacity + 1).fill(null);
        this.indexes = Array(capacity).fill(0);
        this.node[0] = new HeapNode();
        this.node[0].key = -Number.MAX_VALUE;
        this.node[0].vertex = -1;
        this.currentSize = 0;
    }
    swap(a, b)
    {
        var temp = this.node[a];
        this.node[a] = this.node[b];
        this.node[b] = temp;
    }
    isEmpty()
    {
        return this.currentSize == 0;
    }
    heapSize()
    {
        return this.currentSize;
    }
    bubbleUp(pos)
    {
        var parentIdx = parseInt(pos / 2);
        var currentIdx = pos;
        while (currentIdx > 0 
               && this.node[parentIdx].key > this.node[currentIdx].key)
        {
            var currentNode = this.node[currentIdx];
            var parentNode = this.node[parentIdx];
            this.indexes[currentNode.vertex] = parentIdx;
            this.indexes[parentNode.vertex] = currentIdx;
            this.swap(currentIdx, parentIdx);
            currentIdx = parentIdx;
            parentIdx = parseInt(parentIdx / 2);
        }
    }
    insert(x)
    {
        this.currentSize++;
        var idx = this.currentSize;
        this.node[idx] = x;
        this.indexes[x.vertex] = idx;
        this.bubbleUp(idx);
    }
    extractMin()
    {
        var min = this.node[1];
        var lastNode = this.node[this.currentSize];
        this.indexes[lastNode.vertex] = 1;
        this.node[1] = lastNode;
        this.node[this.currentSize] = null;
        this.sinkDown(1);
        this.currentSize--;
        return min;
    }
    sinkDown(k)
    {
        var smallest = k;
        // left child
        var leftChild = 2 * k;
        // right child
        var rightChild = 2 * k + 1;
        if (leftChild < this.heapSize() 
            && this.node[smallest].key > this.node[leftChild].key)
        {
            smallest = leftChild;
        }
        if (rightChild < this.heapSize() 
            && this.node[smallest].key > this.node[rightChild].key)
        {
            smallest = rightChild;
        }
        if (smallest != k)
        {
            var smallestNode = this.node[smallest];
            var kNode = this.node[k];
            this.indexes[smallestNode.vertex] = k;
            this.indexes[kNode.vertex] = smallest;
            this.swap(k, smallest);
            this.sinkDown(smallest);
        }
    }
}
class Graph
{
    constructor(vertices)
    {
        this.vertices = vertices;
        this.adjacencylist = [];
        for (var i = 0; i < this.vertices; ++i)
        {
            this.adjacencylist.push([]);
        }
    }
    addEdge(u, v, weight)
    {
        this.adjacencylist[u].push(new Edge(u, v, weight));
    }
    decreaseKey(minHeap, newKey, vertex)
    {
        var index = minHeap.indexes[vertex];
        var node = minHeap.node[index];
        node.key = newKey;
        minHeap.bubbleUp(index);
    }
    primMST()
    {
        var inHeap = Array(this.vertices).fill(false);
        var resultSet = Array(this.vertices).fill(null);
        var key = Array(this.vertices).fill(0);
        var heapNodes = Array(this.vertices).fill(null);
        // Set default value of heap nodes resultset and keys
        for (var i = 0; i < this.vertices; i++)
        {
            heapNodes[i] = new HeapNode();
            heapNodes[i].vertex = i;
            heapNodes[i].key = Number.MAX_VALUE;
            resultSet[i] = new ResultSet();
            resultSet[i].parent = -1;
            inHeap[i] = true;
            key[i] = Number.MAX_VALUE;
        }
        heapNodes[0].key = 0;
        var minHeap = new MinHeap(this.vertices);
        for (var j = 0; j < this.vertices; j++)
        {
            minHeap.insert(heapNodes[j]);
        }
        var i = 0;
        while (minHeap.isEmpty() == false)
        {
            var extractedNode = minHeap.extractMin();
            var extractedVertex = extractedNode.vertex;
            inHeap[extractedVertex] = false;
            while (i < this.adjacencylist[extractedVertex].length)
            {
                var edge = this.adjacencylist[extractedVertex][i];
                if (inHeap[edge.v])
                {
                    var v = edge.v;
                    var w = edge.weight;
                    if (key[v] > w)
                    {
                        key[v] = w;
                        this.decreaseKey(minHeap, w, v);
                        resultSet[v].parent = extractedVertex;
                        resultSet[v].weight = w;
                    }
                }
                i++;
            }
            i = 0;
        }
        var result = 0;
        console.log("\n\n Minimum Spanning Tree \n");
        for (var node = 1; node < this.vertices; ++node)
        {
            console.log(" Edge (" + resultSet[node].parent + 
                        "-" + node + ")  weight : " + resultSet[node].weight);
            result += resultSet[node].weight;
        }
        // Display calculated result
        console.log(" Total minimum weight : " + result);
        return resultSet;
    }
    // Display graph nodes and edges
    printGraph()
    {
       console.log("\n Graph Adjacency List ");
        for (var i = 0; i < this.vertices; ++i)
        {
           console.log(" \n [" + i + "] :");
            // iterate edges of i node
            for (var j = 0; j < this.adjacencylist[i].length; ++j)
            {
               console.log("  " + this.adjacencylist[i][j].v);
            }
        }
    }
}