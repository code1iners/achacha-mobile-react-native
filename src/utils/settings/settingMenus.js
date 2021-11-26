import { userDelete, userSignOut } from "../../hooks/useAuth";

/**
 * ### Setting screen menus.
 */
export const settingMenus = [
  {
    id: 1,
    label: "Profile",
    contents: [
      {
        title: "Me",
        type: "component",
        componentName: "ProfileScreen",
      },
      {
        title: "Sign out",
        type: "function",
        function: () => userSignOut(),
      },
      {
        title: "Delete account",
        type: "function",
        function: (id) => userDelete(id),
      },
    ],
  },
];
