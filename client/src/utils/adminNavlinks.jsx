import { AiFillProduct } from "react-icons/ai";
import { RiToolsFill } from "react-icons/ri";
import { MdOutlineInventory } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import { MdDashboardCustomize } from "react-icons/md";
export const adminNavLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin/dashboard",
    urlword: "dashboard",
    icon: <MdDashboardCustomize />,
  },
  {
    id: 2,
    name: "Products",
    path: "/admin/products",
    urlword: "products",
    icon: <AiFillProduct />,
  },
  {
    id: 3,
    name: "Data",
    path: "/admin/data",
    urlword: "data",
    icon: <MdCategory />,
  },
  {
    id: 4,
    name: "Repair",
    path: "/admin/repair",
    urlword: "repair",
    icon: <RiToolsFill />,
  },
  {
    id: 5,
    name: "Inventory",
    path: "/admin/inventory",
    urlword: "inventory",
    icon: <MdOutlineInventory />,
  },
  {
    id: 6,
    name: "Blogs",
    path: "/admin/blogs",
    urlword: "blogs",
    icon: <ImBlog />,
  },
];
