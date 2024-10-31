export interface NavItemProps {
    title: string;
    handleClick: ()=>void;
    label ?:string
  
    
  }

  export type StatusCodeTy = 200 | 400 | 401 | 403 | 500;