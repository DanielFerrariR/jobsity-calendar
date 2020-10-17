import { weatherAPI } from 'src/services'
import { FeedState, FETCH_FEED, FetchFeedAction } from './types'

const fetchFeed = async (): Promise<FetchFeedAction> => {
  const response = await weatherAPI.get<FeedState>('/')

  return {
    type: FETCH_FEED,
    payload: response.data
  }
}

// eslint-disable-next-line import/prefer-default-export
export { fetchFeed }
