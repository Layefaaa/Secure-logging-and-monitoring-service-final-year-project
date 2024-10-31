// ----------------------------------------------------------------------

import { SignButton } from "@/app/component/SignInButton";
import { TabsLabel } from "@/app/component/TabLabel";

interface NavItem {
  title: string;
  handleClick: () => void;
  component?: React.ReactElement;
  id:number;
}

export const navContent: NavItem[] = [
  {
    title: "Home",
    handleClick: () => {},
    component: <TabsLabel path="/" label="Home" />,
    id: 1,
  },
  {
    title: "About",
    handleClick: () => {},
    component: <TabsLabel path="/" label="  About" />,
    id:2
  },
  {
    title: "Join now",
    handleClick: () => {},
    component: <SignButton title="Join now" path="/account/register" />,
    id:3
  },
];