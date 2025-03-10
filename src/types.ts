export interface HierarchyElement {
  id: number;
  name: string;
  description: string;
  parentId: number;
  type: 'University' | 'Institute' | 'School' | 'Department' | 'Teacher';
}
