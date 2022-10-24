import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

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
    const { data } = await api.get('/api/images', {
      params: {
        after: pageParam,
      },
    });

    return data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: response => response?.after || null,
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
