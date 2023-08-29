/**
 * @name umi's routing configuration
 * @description Only supports configuration for path, component, routes, redirect, wrappers, name, and icon.
 * @param path Path only supports two kinds of placeholder configurations.
 * The first kind is dynamic parameters in the form of :id, and the second kind is the * wildcard.
 * The wildcard can only appear at the end of the route string.
 * @param component Configures the path of the React component to be rendered after location and path have been matched.
 * It can be either an absolute or relative path. If it's a relative path, it will start searching from src/pages.
 * @param routes Configures sub-routes, commonly used when you need to add layout components to multiple paths.
 * @param redirect Configures route redirection.
 * @param wrappers Configures wrapper components for the route component.
 * Through wrapper components, more functionalities can be composed into the current route component.
 * For example, it can be used for route-level permission validation.
 * @param name Configures the title of the route.
 * By default, it reads the value from the internationalization file menu.ts as menu.xxxx.
 * For example, if the name is configured as login, it will read the value of menu.login from menu.ts as the title.
 * @param icon Configures the icon of the route. Refer to https://ant.design/components/icon for possible values.
 * Note to remove style suffixes and disregard case.
 * For example, if you want to configure the icon as <StepBackwardOutlined />, the value should be stepBackward or StepBackward;
 * if you want to configure the icon as <UserOutlined />, the value should be user or User.
 * @doc https://umijs.org/docs/guides/routes
 */

export default [
  {
    name: 'login',
    layout: false,
    path: '/login',
    component: './Login',
  },

  {
    name: 'home',
    path: '/home',
    icon: 'home',
    component: './Home',
    
  },
  {
    name: 'workspace',
    icon: 'deploymentUnit',
    path: '/workspace',
    
    routes:[
      {
        path: '/workspace',
        component: './Workspace',
      },
      {
        path: '/workspace/new',
        component: './NewWorkspace',
        hideInMenu: true,
      },
      {
        path: '/workspace/:workspaceId',
        component: './Workspace/WorkspaceInfo',
        hideInMenu: true,
      },
    
    ]
  },
  {
    name:'composer',
    icon:'slidersOutlined',
    path:'/composer'
  },
  {
    name:'jobmonitor',
    icon:'areaChartOutlined',
    path:'/jobmonitor'
  }, 
  {
    path: '/template/:templateId',
    component: './TemplateInfo',
    hideInMenu: true,
  },
  
  
  {
    path: '/user',
    component: './AdminUserList',
  },


  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        redirect:'/user',
        component: './Admin',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
