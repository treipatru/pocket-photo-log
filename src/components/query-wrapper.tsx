import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient();

export default function QueryWrapper(props: React.PropsWithChildren) {
	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
