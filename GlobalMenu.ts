export let menuItems: {
    id: string;
    name: string;
    description: string;
    price: number;
    course: string;
  }[] = [];
  
  export const addMenuItem = (item: {
    id: string;
    name: string;
    description: string;
    price: number;
    course: string;
  }) => {
    menuItems.push(item);
  };
  
  export const setMenuItems = (
    items: {
      id: string;
      name: string;
      description: string;
      price: number;
      course: string;
    }[]
  ) => {
    menuItems = items;
  };
  