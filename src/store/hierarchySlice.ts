import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchHierarchyAPI,
  addHierarchyNodeAPI,
  editHierarchyNodeAPI,
  deleteHierarchyNodeAPI,
} from '../api'; // Import API functions
import { HierarchyElement } from '../types';

// Define the state type
interface HierarchyState {
  nodes: HierarchyElement[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: HierarchyState = {
  nodes: [],
  status: 'idle',
  error: null,
};

// ✅ Async actions using the centralized API
export const fetchHierarchy = createAsyncThunk('hierarchy/fetchHierarchy', fetchHierarchyAPI);
export const addHierarchyNode = createAsyncThunk('hierarchy/addHierarchyNode', addHierarchyNodeAPI);
export const editHierarchyNode = createAsyncThunk('hierarchy/editHierarchyNode', editHierarchyNodeAPI);
export const deleteHierarchyNode = createAsyncThunk('hierarchy/deleteHierarchyNode', deleteHierarchyNodeAPI);

const hierarchySlice = createSlice({
  name: 'hierarchy',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHierarchy.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHierarchy.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.nodes = action.payload;
      })
      .addCase(fetchHierarchy.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch hierarchy';
      })

      .addCase(addHierarchyNode.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.nodes.push(action.payload);
        }
      })

      .addCase(editHierarchyNode.fulfilled, (state, action) => {
        const index = state.nodes.findIndex((node) => node.id === action.payload.id);
        if (index !== -1) {
          state.nodes[index] = action.payload;
        }
      })

      .addCase(deleteHierarchyNode.fulfilled, (state, action) => {
        state.nodes = state.nodes.filter((node) => node.id !== action.payload);
      });
  },
});

export default hierarchySlice.reducer;
