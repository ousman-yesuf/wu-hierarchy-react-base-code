import axios from 'axios';
import { HierarchyElement } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:5000/hierarchy';

// ✅ Fetch all hierarchy nodes
export const fetchHierarchyAPI = async (): Promise<HierarchyElement[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ✅ Add a new hierarchy node
export const addHierarchyNodeAPI = async (newNode: HierarchyElement): Promise<HierarchyElement> => {
  const response = await axios.post(API_URL, newNode);
  return response.data;
};

// ✅ Edit an existing node
export const editHierarchyNodeAPI = async (updatedNode: HierarchyElement): Promise<HierarchyElement> => {
  const response = await axios.put(`${API_URL}/${updatedNode.id}`, updatedNode);
  return response.data;
};

export const editHierarchyNode = createAsyncThunk<HierarchyElement, HierarchyElement>(
  'hierarchy/edit',
  async (node: HierarchyElement) => {
    // Make an API request to update the hierarchy node
    const response = await axios.put(`https://api.example.com/hierarchy/${node.id}`, node);
    return response.data; // This will be the payload passed to the reducer
  }
);

// ✅ Delete a node by ID
export const deleteHierarchyNodeAPI = async (id: number): Promise<number> => {
  await axios.delete(`${API_URL}/${id}`);
  return id; // Return the ID for filtering
};
