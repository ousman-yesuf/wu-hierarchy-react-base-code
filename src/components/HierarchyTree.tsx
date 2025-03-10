import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHierarchy, deleteHierarchyNode } from '../store/hierarchySlice';
import { RootState, AppDispatch } from '../store/store';
import { Link } from 'react-router-dom';

const HierarchyTree = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hierarchy = useSelector((state: RootState) => state.hierarchy.nodes);
  const status = useSelector((state: RootState) => state.hierarchy.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchHierarchy());
    }
  }, [status, dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteHierarchyNode(id));
  };

  // Recursive function to build a tree structure
  const renderTree = (parentId: number) => {
    const children = hierarchy.filter(node => node.parentId === parentId);
    if (children.length === 0) return null;

    return (
      <ul className="ml-4 border-l pl-4">
        {children.map(node => (
          <li key={node.id} className="border p-2">
            <span className="font-semibold">{node.type}:</span> {node.name}
            <div className="mt-1 space-x-2">
              <Link to={`/edit/${node.id}`} className="text-blue-500">Edit</Link>
              <button onClick={() => handleDelete(node.id)} className="text-red-500">Delete</button>
            </div>
            {renderTree(node.id)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Hierarchy Tree</h1>
      {renderTree(0)}
      <Link to="/add" className="block mt-4 bg-blue-500 text-white p-2 text-center rounded">Add New Node</Link>
    </div>
  );
};

export default HierarchyTree;
