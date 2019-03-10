
const node1 = new Node("node1", [87, 70]);
const node2 = new Node("node2", [430, 276]);
const node3 = new Node("node3", [14, 394]);
const node4 = new Node("node4", [290, 613]);
const node5 = new Node("node5", [770, 408]);
const node6 = new Node("node6", [831, 51]);
const badge1 = new Badge("badge1", [400, 100], '#d46');
const badge2 = new Badge("badge2", [550, 100], '#64d');
const badge3 = new Badge("badge3", [700, 100], '#4d6');

var nodesAndBadges = [node1, node2, node3, node4, node5, node6, badge1, badge2, badge3];

node1.getChildren(node2);
node3.getChildren(node2);
node4.getChildren(node2);
node2.getChildren(node5);
node6.getChildren(node2);
node4.getChildren(node5);
badge2.getChildren(badge1, badge3, node5);

for (let n of nodesAndBadges) {
  n.getParents();
  n.linkChildren();
  n.move(...n.initPos);
}