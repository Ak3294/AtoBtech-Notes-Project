export interface Note {
  id: string;
  title: string;
  description: string;
  price: number;
  subject: string;
  pdfUrl: string;
  thumbnail: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  purchases: string[];
}