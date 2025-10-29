import {RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export default function App() {

  const queryClient = new QueryClient()
  return (
    <>
    {/*غلفت الراوتر بالكويري*/ }
    <QueryClientProvider client={queryClient}>
       <ReactQueryDevtools initialIsOpen={false} />
    <RouterProvider router={router} />
    </QueryClientProvider>
    </>
    
  )
}
