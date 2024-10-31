import { usePathname } from "next/navigation";

export const UsePathName = () => {
  const path = usePathname();
  return path;
};
