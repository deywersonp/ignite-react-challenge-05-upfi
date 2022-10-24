import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { AxiosResponse } from 'axios';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Data = {
  title: string;
  description: string;
  ts: number;
  url: string;
  id: string;
};

type ImagesResponse = {
  data: Data[];
  after: null | undefined | string;
};

type FetchImagesParam = {
  pageParam?: string;
};

export default function Home(): JSX.Element {
  const fetchImages = async ({
    pageParam = null,
  }: FetchImagesParam): Promise<ImagesResponse> => {
    let response: AxiosResponse<ImagesResponse>;

    if (!pageParam) {
      response = await api.get(`/api/images`);
    } else {
      response = await api.get(`/api/images?after=${pageParam}`);
    }

    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: response => {
      if (!response.after) {
        return null;
      }

      return response.after;
    },
  });

  const formattedData = useMemo(() => {
    if (!data) {
      return null;
    }

    const format = data.pages.map(page => page.data).flat();
    return format;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button
            mt={10}
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
