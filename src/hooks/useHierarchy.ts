import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HierarchyElement {
  id: number;
  name: string;
  description: string;
  parentId: number | null;
  type: 'University' | 'Institute' | 'School' | 'Department' | 'Teacher';
}

interface HierarchyState {
  elements: HierarchyElement[];
}

const initialState: HierarchyState = {
  elements: []
};

const hierarchySlice = createSlice({
  name: 'hierarchy',
  initialState,
  reducers: {
    addElement(state, action: PayloadAction<HierarchyElement>) {
      state.elements.push(action.payload);
    },
    updateElement(state, action: PayloadAction<HierarchyElement>) {
      const index = state.elements.findIndex(el => el.id === action.payload.id);
      if (index !== -1) {
        state.elements[index] = action.payload;
      }
    },
    deleteElement(state, action: PayloadAction<number>) {
      state.elements = state.elements.filter(el => el.id !== action.payload);
    },
  },
});

export const { addElement, updateElement, deleteElement } = hierarchySlice.actions;
export default hierarchySlice.reducer;
