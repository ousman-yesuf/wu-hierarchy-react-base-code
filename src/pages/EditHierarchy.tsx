import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Import RootState from the store
import { editHierarchyNode, fetchHierarchy } from '../store/hierarchySlice'; // Import actions
import { HierarchyElement } from '../types'; // Import the type for HierarchyElement
import {
  fetchHierarchyAPI,
  addHierarchyNodeAPI,
  editHierarchyNodeAPI,
  deleteHierarchyNodeAPI,
} from '../api'; // Import API functions

const EditHierarchyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Fetch hierarchy data from the Redux store
  const hierarchyNodes = useSelector((state: RootState) => state.hierarchy.nodes);

  // Fetch the specific node to edit based on the id
  const nodeToEdit = hierarchyNodes.find(node => node.id === Number(id));

  // State for the form fields
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<'University' | 'Institute' | 'School' | 'Department' | 'Teacher' | ''>(''); // Type for dropdown

   
  // When the component mounts, if there's a node to edit, populate the form
  useEffect(() => {
    if (nodeToEdit) {
      setName(nodeToEdit.name);
      setDescription(nodeToEdit.description);
      setType(nodeToEdit.type);
    }
  }, [nodeToEdit]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (name && type) {
      // Dispatch the edit action to update the node
      dispatch(editHierarchyNode(HierarchyElement))
        .then(() => {
          navigate('/'); // Navigate to the homepage after editing
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            console.error('Error editing node:', error.message);
          } else {
            console.error('Unknown error occurred');
          }
        });
    } else {
      console.log('Name and type are required.');
    }
  };
  

  // If no node is found to edit, show a loading or error message
  if (!nodeToEdit) {
    return <div>Node not found or loading...</div>;
  }

  return (
    <div className="p-4">
      <h2>Edit Hierarchy Node</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Name:</label>
          <input 
            id="name" 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="description" className="block">Description:</label>
          <input 
            id="description" 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="type" className="block">Type:</label>
          <select 
            id="type" 
            value={type} 
            onChange={(e) => setType(e.target.value as 'University' | 'Institute' | 'School' | 'Department' | 'Teacher')}
            className="border p-2 w-full"
          >
            <option value="">Select a Type</option>
            <option value="University">University</option>
            <option value="Institute">Institute</option>
            <option value="School">School</option>
            <option value="Department">Department</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default EditHierarchyForm;
