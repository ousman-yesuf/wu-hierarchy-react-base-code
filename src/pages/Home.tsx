// src/pages/Home.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHierarchy } from '../store/hierarchySlice';
import TreeView from '../components/TreeView';

const Home = () => {
  const dispatch = useDispatch();
  const { nodes, loading, error } = useSelector((state: any) => state.hierarchy); // Adjust the state type as needed

  useEffect(() => {
    dispatch(fetchHierarchy());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Convert flat hierarchy to nested structure
  const buildHierarchy = (nodes: any[]) => {
    const map: any = {};
    const roots: any[] = [];

    nodes.forEach((node: any) => {
      map[node.id] = { ...node, children: [] };
      if (node.parentId === 0) {
        roots.push(map[node.id]);
      } else {
        if (map[node.parentId]) {
          map[node.parentId].children.push(map[node.id]);
        }
      }
    });

    return roots;
  };

  const hierarchyNodes = buildHierarchy(nodes);

  return (
    <div>
      <h1>Hierarchy Tree</h1>
      <TreeView nodes={hierarchyNodes} />
    </div>
  );
};

export default Home;
