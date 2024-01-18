const router = createRouter([{ 
  id: "app",
  element: (<RootLayoutRouteElement></RootLayoutRouteElement>),
  errorElement: <RootErrorElement/>
  ,
  children: [{
  id: "app/",  index: true,
  element: (<PageRouteElement>{lazy(() => import("./app/page"))}</PageRouteElement>)},
{
  id: "app/gallery",  path: "gallery",
  element: (<LayoutRouteElement>{lazy(() => import("./app/gallery/layout"))}</LayoutRouteElement>),
  children: [{
  id: "app/gallery/list",  path: "list",
  element: (<PageRouteElement>{lazy(() => import("./app/gallery/list/page"))}</PageRouteElement>)},
{
  id: "app/gallery",
  element: (<InterceptingRouteElement page={<PageRouteElement>{lazy(() => import("./app/gallery/page"))}</PageRouteElement>} />),
  children: [{
  id: "app/gallery/(..)imgs/[id]",  path: "imgs/:id",
  element: (<PageRouteElement>{lazy(() => import("./app/gallery/(..)imgs/[id]/page"))}</PageRouteElement>)},
{
  id: "app/gallery/(..)imgs/[id]",  path: "imgs/:id",
  element: (<PageRouteElement>{lazy(() => import("./app/gallery/(..)imgs/[id]/page"))}</PageRouteElement>)},
{
  id: "app/gallery/nested/(..)(..)imgs/[id]",  path: "nested/imgs/:id",
  element: (<PageRouteElement>{lazy(() => import("./app/gallery/nested/(..)(..)imgs/[id]/page"))}</PageRouteElement>)},
{
  id: "app/gallery/nested/nested/(...)imgs/[id]",  path: "nested/nested/imgs/:id",
  element: (<PageRouteElement>{lazy(() => import("./app/gallery/nested/nested/(...)imgs/[id]/page"))}</PageRouteElement>)},
]},
]},
{
  id: "app/imgs/[id]",  path: "imgs/:id",
  element: (<InterceptedRouteElement
  interceptingRouteElement={<PageRouteElement>{lazy(() => import("./app/(.)imgs/[id]/page"))}</PageRouteElement>}
>
  <PageRouteElement>{lazy(() => import("./app/imgs/[id]/page"))}</PageRouteElement></InterceptedRouteElement>)},
]},
], {basename: "/page/index/index"});

export default router;