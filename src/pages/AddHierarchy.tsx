import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHierarchyNode } from '../store/hierarchySlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store/store';

const AddHierarchy = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Institute');
  const [parentId, setParentId] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && type) {
      dispatch(addHierarchyNode({ id: Date.now(), name, description, type, parentId }));
      navigate('/');
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Add New Hierarchy Node</h1>
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
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)} 
          className="border p-2 w-full"
        >
          <option value="Institute">Institute</option>
          <option value="School">School</option>
          <option value="Department">Department</option>
          <option value="Teacher">Teacher</option>
        </select>
        <input 
          type="number" 
          value={parentId} 
          onChange={(e) => setParentId(Number(e.target.value))} 
          placeholder="Parent ID (0 if root)" 
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Add Node</button>
      </form>
    </div>
  );
};

export default AddHierarchy;
