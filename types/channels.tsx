export interface CategoryProps {
  channels: {
    id: string;
    title: string;
    type: "text" | "voice";
  }[];
  id: string;
  title: string;
}
