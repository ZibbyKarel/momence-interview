import { useQuery } from 'react-query';
import { GetRatesApiResponse, Rate } from '@momence-interview-nx/shared';

export type RatesQueryData = Rate[];

export const getRateQueryKey = () => ['rates'];

export const getRates = async (): Promise<Rate[]> => {
	const response = await fetch('/api/rates');
	const resp: GetRatesApiResponse = await response.json();

	if ('error' in resp) {
		throw new Error(resp.error);
	} else {
		return resp.data;
	}
};

export const useRatesQuery = () => {
	return useQuery<RatesQueryData>(getRateQueryKey(), getRates, {
		staleTime: 0, // to be sure that it's always fresh
		refetchInterval: 3 * 60 * 1000, // refetch every 3 minutes to have fresh data if user has a page opened for a long time
		refetchOnWindowFocus: true, // refetch when user comes back to the page
	});
};
