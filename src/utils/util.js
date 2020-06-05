import forEach from "lodash/forEach";
export const getRouterCacheName = function(array) {
  let tempArray = [];
  forEach(array, item => {
    if (item.children && item.children.length > 0) {
      tempArray.push(getRouterCacheName(item.children));
    } else {
      let tempArray2 = item.path.split("/");
      tempArray.push(tempArray2[tempArray2.length - 1]);
    }
  });
  return tempArray.toString().split(",");
};
