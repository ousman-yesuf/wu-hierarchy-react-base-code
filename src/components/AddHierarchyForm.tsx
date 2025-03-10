// AddHierarchyForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addHierarchyNode } from '../store/hierarchySlice';
import {
  fetchHierarchyAPI,
  addHierarchyNodeAPI,
  editHierarchyNodeAPI,
  deleteHierarchyNodeAPI,
} from '../api'; // Import API functions

const AddHierarchyForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'University' | 'Institute' | 'School' | 'Department' | 'Teacher' | ''>('');  // Initial state is an empty string, which is acceptable for validation
  const [parentId, setParentId] = useState<number | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ✅ Ensure type is valid
    if (name && type) {
      dispatch(addHierarchyNode({ id: Date.now(), name, description, type, parentId: parentId || 0 }));
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value as 'University' | 'Institute' | 'School' | 'Department' | 'Teacher')}>
          <option value="">Select Type</option>
          <option value="University">University</option>
          <option value="Institute">Institute</option>
          <option value="School">School</option>
          <option value="Department">Department</option>
          <option value="Teacher">Teacher</option>
        </select>
      </div>
      <div>
        <label>Parent ID</label>
        <input type="number" value={parentId || ''} onChange={(e) => setParentId(Number(e.target.value))} />
      </div>
      <button type="submit">Add Node</button>
    </form>
  );
};

export default AddHierarchyForm;
