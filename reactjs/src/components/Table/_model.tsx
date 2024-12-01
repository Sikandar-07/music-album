export interface Employee {
  id: number;
  name: string;
  country: { name: string };
  representative: string;
  activity: number;
  status: string;
  verified: boolean;
}

export interface Data {
  id: number;
  name: string;
  title: number;
}

export interface Column {
  id: "id" | "name" | "title" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
