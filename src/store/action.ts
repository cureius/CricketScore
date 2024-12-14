export const remoteScoreList = (params: {
  page: number;
}) => ({
  type: 'API_REQUEST',
  payload: {
    page: params.page,
  },
});
export const localScoreList = () => ({
  type: 'LOCAL_REQUEST',
});
