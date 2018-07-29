var Graph;
var selectedNode;
var nmap = {};  
var iNodes = [];
let NODE_R = 10;
    let highlightNodes = [];
    let highlightLink = null;
    let rT = false;
console.log("data");
var check = false;
  
    function showGraph(){
      if(check == false){
         check = true;
         showGraph()

      }
     
  iNodes = [];
  selectedNode = undefined;
      $('button').prop('disabled',false);

   fetch('./data.json').then(res => res.json()).then(data => {

    console.log(data);
    const elem = document.getElementById('graph');
    Graph = ForceGraph()(elem);


    data.nodes.forEach(node => {
      node.fx = node.x;
      node.fy = node.y;
    })

    console.log(data);
    data.nodes.forEach(node => {
      nmap[node.id] = node;
    }) 
    Graph.zoom(.6,100)


    Graph
    .backgroundColor('#125698')
    .nodeRelSize(10)
    
 .onNodeHover(node => {
        highlightNodes = node ? [node] : [];
        elem.style.cursor = node ? '-webkit-grab' : null;
      })
      .onLinkHover(link => {
        highlightLink = link;
        highlightNodes = link ? [link.source, link.target] : [];
      })
      .nodeLabel(node => `${node.id}`)
      .linkColor(link => { if( (iNodes &&  iNodes.includes(link.source.id) && iNodes.includes(link.target.id)) || (iNodes && selectedNode &&  selectedNode.id == link.source.id && iNodes.includes(link.target.id))){
        return '#ff0000'
      } else return 'rgba(255,255,255,0.2)'})
      .linkDirectionalParticleWidth(link => link === highlightLink ? 4 : 0)
      .linkWidth(link => link === highlightLink ? 5 : 1)
      .nodeCanvasObject((node, ctx) => {

       
        if (highlightNodes.indexOf(node) !== -1) { // add ring
          ctx.beginPath();
           if(rT){
        ctx.arc(node.x, node.y,node.radius, 0, 2 * Math.PI, false);
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#ea6c1f';
        ctx.stroke();
           }else{
            ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#ea6c1f';
          ctx.fill();
           }
        
         
        }

        
        ctx.beginPath();
       
      ctx.arc(node.x, node.y, NODE_R, 0, 2 * Math.PI, false);
    
       
        if(selectedNode != undefined && node.id == selectedNode.id){
      
          ctx.fillStyle = '#654321';

    } else if(iNodes.includes(node.id)){
      ctx.fillStyle = '#b852ff'; 
    }else {if(node.type  == 'sensor')ctx.fillStyle = '#1f0818'  
    else ctx.fillStyle = '#d3ffce'  }
         
        ctx.fill();
      })
      .onNodeClick(node => {
        selectedNode = undefined;
        iNodes = [];
        selectedNode = node;
        // Center/zoom on node
        Graph.centerAt(node.x, node.y, 500);
        Graph.zoom(1.5, 500);
      })
      .graphData(data)  .d3Force('charge').strength(-150);
    });

 }


 function showLPaths(){
    let data = Graph.graphData();

     iNodes = [];
    if(selectedNode == undefined){
      alert("select a node to proceed")
      return;
    }
    if(selectedNode.lPaths == undefined){
      alert("No lpath for super node")
      return
    }
    
    if(selectedNode.lPaths.length > 0){
      selectedNode.lPaths.forEach(ar => {
        ar.forEach(a => {
          if(!iNodes.includes(a)){
            iNodes.push(a)
          }
        })
       

      })
      

      
    }

    
  
    else
    alert("No nodes to display");

 }
 function showDPaths(){
   let data = Graph.graphData();

    iNodes = [];
    if(selectedNode == undefined){
      alert("select a node to proceed")
      return;
    }
    if(selectedNode.dPaths == undefined){
      alert("No dpath for super node")
      return
    }
    
    if(selectedNode.dPaths.length > 0){
      selectedNode.dPaths.forEach(ar => {
        ar.forEach(a => {
          if(!iNodes.includes(a)){
            iNodes.push(a)
          }
        })
       

      })
      

      
    }

    
  
    else
    alert("No nodes to display");

    
 }
 function showNeighbour(){
   let data = Graph.graphData();
    
   iNodes = [];
    if(selectedNode == undefined){
      alert("select a node to proceed")
      return;
    }
    if(selectedNode.neighbour == undefined){
      alert("No neighbour for super node")
      return
    }
    
    if(selectedNode.neighbour.length > 0){
      selectedNode.neighbour.forEach(ar => {
      
          if(!iNodes.includes(ar)){
            iNodes.push(ar)
          }
        
       

      })
      

      
    }

    
  
    else
    alert("No nodes to display");

    
 }
 function showRadius(){
   let data = Graph.graphData();
    
  rT = !rT;
   console.log(NODE_R, rT);
 Graph.nodeRelSize(10)
   
 }