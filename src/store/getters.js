export default {
  menu: state => state.system.menu,
  keyCollapse: state => state.system.keyCollapse,
  routeCache: state => state.system.routeCache,
  routeCacheView: state => state.system.routeCacheView,
  roles: state => state.user.roles,
  name: state => state.user.name
};
