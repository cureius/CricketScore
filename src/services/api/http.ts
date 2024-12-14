import axios, {AxiosResponse} from 'axios';
import {base_url} from '../../utils/constants';
import {cricketScoresEndpoint} from './endpoints';

interface CricketScoreHistoryParams {
  page: number;
}

interface CricketScoreHistoryResponse {
  status: string;
  totalResults: number;
  scores: Array<any>;
}

export const getCricketScoreHistoryRequest = async (
  params: CricketScoreHistoryParams,
): Promise<AxiosResponse<CricketScoreHistoryResponse>> => {
  const response = await axios.get<CricketScoreHistoryResponse>(
    `${base_url}${cricketScoresEndpoint}`,
    {
      params: {
        page: params.page,
        pageSize: 10,
      },
    },
  );
  return response;
};

export const getLocalScoreRequest = async (): Promise<{
  data: Array<[string, number]>;
}> => {
  return {
    data: [
      ['Pakistan', 56],
      ['Pakistan', 98],
      ['India', 65],
      ['India', 42],
      ['Australia', 55],
      ['Afghanistan', 69],
      ['India', 92],
      ['Pakistan', 66],
    ],
  };
};
