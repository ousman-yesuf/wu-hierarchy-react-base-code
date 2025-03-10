// types.ts
export interface HierarchyElement {
    id: number;
    name: string;
    description: string;
    parentId: number | null;
    type: 'University' | 'Institute' | 'School' | 'Department' | 'Teacher';
  }
  