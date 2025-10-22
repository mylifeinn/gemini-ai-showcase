
export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface GroundingSource {
    web?: {
        uri: string;
        title: string;
    }
}
