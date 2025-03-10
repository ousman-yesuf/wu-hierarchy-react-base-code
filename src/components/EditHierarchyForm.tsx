import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editHierarchyNode } from '../store/hierarchySlice';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';

const EditHierarchyForm = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const hierarchyNodes = useSelector((state: RootState) => state.hierarchy.nodes);
  const nodeToEdit = hierarchyNodes.find(node => node.id === Number(id));

  const [name, setName] = useState(nodeToEdit?.name || '');
  const [description, setDescription] = useState(nodeToEdit?.description || '');
  const [type, setType] = useState(nodeToEdit?.type || 'Institute');
  const [parentId, setParentId] = useState(nodeToEdit?.parentId || 0);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as 'University' | 'Institute' | 'School' | 'Department' | 'Teacher');
  };
  

  useEffect(() => {
    if (nodeToEdit) {
      setName(nodeToEdit.name);
      setDescription(nodeToEdit.description);
      setType(nodeToEdit.type);
      setParentId(nodeToEdit.parentId);
    }
  }, [nodeToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nodeToEdit) {
      dispatch(editHierarchyNode({ id: Number(id), name, description, type, parentId }));
      navigate('/');
    }
  };

  if (!nodeToEdit) {
    return <div className="text-red-500">Node not found!</div>;
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Edit Hierarchy Node</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
          className="border p-2 w-full"
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
          className="border p-2 w-full"
        />
       // Inside the JSX
      <select value={type} onChange={handleSelectChange}>
            <option value="University">University</option>
            <option value="Institute">Institute</option>
            <option value="School">School</option>
            <option value="Department">Department</option>
            <option value="Teacher">Teacher</option>
      </select>
        <input 
          type="number" 
          value={parentId} 
          onChange={(e) => setParentId(Number(e.target.value))} 
          placeholder="Parent ID" 
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Save Changes</button>
      </form>
    </div>
  );
};

export default EditHierarchyForm;
