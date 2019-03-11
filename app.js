/////////////////////////////////////////////////////////////
// TODO : function to automatically generate muliple nodes //

// const nodeCount = {
//   nodeInc: 0,
//   badgeInc: 0
// }

// function createNewNode(type='node', pos, text=undefined, color=undefined) {
//   let inc = nodeCount[type + 'Inc'] += 1;
//   if (type == 'node') {
//     return new Node(type + inc, pos, text, color);
//   } else if (type == 'badge') {
//     return new Badge(type + inc, pos, text, color);
//   } 
// }

/////////////////////////////////////////////////////////////

const texts = [
  ["On passe une moitié de sa vie à attendre ceux qu'on aimera et l'autre moitié à quitter ceux qu'on aime.", "Victor Hugo"], 
  ["Tu dois devenir l'homme que tu es. Fais ce que toi seul peux faire. Deviens sans cesse celui que tu es, sois le maître et le sculpteur de toi-même.", "Friedrich Nietzsche"],
  ["Le monde est dangereux à vivre ! Non pas tant à cause de ceux qui font le mal, mais à cause de ceux qui regardent et laissent faire.", "Albert Einstein"], 
  ["La musique chasse la haine chez ceux qui sont sans amour. Elle donne la paix à ceux qui sont sans repos, elle console ceux qui pleurent.", "Pablo Casals"],  
  ["Que la force me soit donnée de supporter ce qui ne peut être changé et le courage de changer ce qui peut l'être mais aussi la sagesse de distinguer l'un de l'autre.", "Marc Aurèle"],
  ["L'éducation ne se borne pas à l'enfance et à l'adolescence. L'enseignement ne se limite pas à l'école. Toute la vie, notre milieu est notre éducation, et un éducateur à la fois sévère et dangereux.", "Paul Valéry"]
];


const node1 = new Node("node1", [87, 70], texts[0]);
const node2 = new Node("node2", [430, 276], texts[1]);
const node3 = new Node("node3", [14, 394], texts[2]);
const node4 = new Node("node4", [290, 613], texts[3]);
const node5 = new Node("node5", [831, 408], texts[4]);
const node6 = new Node("node6", [831, 151], texts[5]);
const badge1 = new Badge("badge1", [400, 100], " -- BADGE 1 --- BADGE 1 ");
const badge2 = new Badge("badge2", [550, 100], " -- BADGE 2 --- BADGE 2 ");
const badge3 = new Badge("badge3", [700, 100], " -- BADGE 3 --- BADGE 3 ");

var nodes = [node1, node2, node3, node4, node5, node6, badge1, badge2, badge3];

node1.getChildren(node2);
node2.getChildren(node5);
node3.getChildren(node2);
node4.getChildren(node2, node5);
node6.getChildren(node2);
badge2.getChildren(badge1, badge3, node2);
badge3.getChildren(node6);

for (let n of nodes) {
  n.getParents();
  n.linkChildren();
  n.move(...n.initPos);
}