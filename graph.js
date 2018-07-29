var cy = cytoscape({
  container: document.getElementById('cy'),

  boxSelectionEnabled: false,
  autounselectify: true,

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(id)'
      })
    .selector('edge')
      .css({
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'width': 4,
        'line-color': '#ddd',
        'target-arrow-color': '#ddd'
      })
    .selector('.highlighted')
      .css({
        'background-color': '#61bffc',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      })
      .selector('.second_level')
      .css({
        'background-color': 'black',
        'line-color': 'red',
        'width': 40,
        'height': 40
      })
      .selector('.base_level')
      .css({
        'background-color': '#61bffc',
        'width': 50,
        'height': 50
      }),


  elements: {
      nodes: [
        { data: { id: 'a' },  position: { x: 100, y: 100 } },
        { data: { id: 'b' },  position: { x: 200, y: 150 } },
        { data: { id: 'c' },  position: { x: 300, y: 200 } },
        { data: { id: 'd' },  position: { x: 100, y: 250 } },
        { data: { id: 'e' },  position: { x: 300, y: 50 } },
        { data: { id: 'x' },  position: { x: 500, y: 400 } },
        { data: { id: 'y' },  position: { x: 600, y: 450 } },
        { data: { id: 'z' },  position: { x: 500, y: 500 } },
        { data: { id: 'v' },  position: { x: 600, y: 550 } },
        { data: { id: 'w' },  position: { x: 400, y: 550 } },
        { data: { id: 'SECOND-LEVEL-CLUSTER-HEAD' },  position: { x: 200, y: 400 } },
        { data: { id: 'o' },  position: { x: 400, y: 350 } },
        { data: { id: 'p' },  position: { x: 150, y: 600 } },
        { data: { id: 'BASE-STATION' },  position: { x: -200, y: 550 } },

      ],

      edges: [
        { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } },
        { data: { id: 'cb', weight: 3, source: 'c', target: 'b' } },
        { data: { id: 'db', weight: 3, source: 'd', target: 'b' } },
        { data: { id: 'eb', weight: 3, source: 'e', target: 'b' } },
        { data: { id: 'xh', weight: 3, source: 'x', target: 'z' } },
        { data: { id: 'yh', weight: 3, source: 'y', target: 'z' } },
        { data: { id: 'wh', weight: 3, source: 'w', target: 'z' } },
        { data: { id: 'vh', weight: 3, source: 'v', target: 'z' } },
        { data: { id: 'bSECOND-LEVEL-CLUSTER-HEAD', weight: 3, source: 'b', target: 'SECOND-LEVEL-CLUSTER-HEAD' } },
        { data: { id: 'zSECOND-LEVEL-CLUSTER-HEAD', weight: 3, source: 'z', target: 'SECOND-LEVEL-CLUSTER-HEAD' } },
        { data: { id: 'oSECOND-LEVEL-CLUSTER-HEAD', weight: 3, source: 'o', target: 'SECOND-LEVEL-CLUSTER-HEAD' } },
        { data: { id: 'pSECOND-LEVEL-CLUSTER-HEAD', weight: 3, source: 'p', target: 'SECOND-LEVEL-CLUSTER-HEAD' } },
        { data: { id: 'BASE-STATION SECOND-LEVEL-CLUSTER-HEAD', weight: 3, source: 'SECOND-LEVEL-CLUSTER-HEAD', target: 'BASE-STATION' } },

      ]
    },

  layout: {
    name: 'preset',
    padding: 10
  }
});


var bfs =  cy.edges();

var i = 0;
var highlightNextEle = function(){
  if( i < bfs.length ){
    bfs[i].addClass('highlighted');

    i++;
    setTimeout(highlightNextEle, 1000);
  }
};

// kick off first highlight
highlightNextEle();

cy.getElementById('SECOND-LEVEL-CLUSTER-HEAD').addClass('second_level');
cy.getElementById('BASE-STATION').addClass('base_level');
