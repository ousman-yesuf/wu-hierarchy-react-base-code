// src/components/TreeView.tsx
import React from 'react';

interface TreeNode {
  id: number;
  name: string;
  children?: TreeNode[];
}

interface TreeViewProps {
  nodes: TreeNode[];
}

const TreeView: React.FC<TreeViewProps> = ({ nodes }) => {
  const renderNode = (node: TreeNode) => (
    <li key={node.id}>
      <div>{node.name}</div>
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map(renderNode)}
        </ul>
      )}
    </li>
  );

  return <ul>{nodes.map(renderNode)}</ul>;
};

export default TreeView;
