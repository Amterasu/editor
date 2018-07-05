const parseTreeJson = (treeNodes, vnodeHierarchy, i) => {
  if (!treeNodes || !treeNodes.length) return false;
  if (treeNodes.vnodeHierarchy == vnodeHierarchy){
    treeNodes.childNode.push(state.dragStructure)
  }
    for (var i = 0, len = treeNodes.length; i < len; i++) {
      var childs = treeNodes[i].children;
      if (childs && childs.length > 0) {
        parseTreeJson(childs);
      }
    }
};