import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { getRateQueryKey, RatesQueryData } from '../../api/queries/ratesQuery';

/**
 * Hook that retrieves loaded currency rates from RQ cache and
 * returns function that converts amount from CZK to another currency
 *
 * @returns function that converts amount from CZK to another currency
 */
export const useCZKCurrencyConvertor = () => {
	const queryClient = useQueryClient();

	const convert = (amount: number, toCurrencyCode: string): number => {
		const rates = queryClient.getQueryData<RatesQueryData>(getRateQueryKey());

		if (rates === undefined) {
			throw new Error('Rates are not loaded yet');
		}

		const rate = rates.find((rate) => rate.code === toCurrencyCode);

		if (!rate) {
			throw new Error(`Rate for ${toCurrencyCode} not found`);
		}

		return (amount / rate.rate) * rate.amount;
	};

	// do not recreate the function on every render
	return useCallback(convert, [queryClient]);
};
