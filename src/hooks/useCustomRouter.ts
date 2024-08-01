import { useRouter, useSearchParams } from "next/navigation";

const useCustomRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query: Record<string, any> = {};

  const search = searchParams.get("search") ?? undefined;
  const sort = searchParams.get("sort") ?? undefined;

  if (search) query.search = search;
  if (sort) query.sort = sort;

  const pushQuery = ({ search, sort }: { search?: string; sort?: string }) => {
    if (search !== undefined) {
      if (search === "") {
        delete query.search;
      } else {
        query.search = search;
      }
    }

    if (sort !== undefined) {
      if (sort === "") {
        delete query.sort;
      } else {
        query.sort = sort;
      }
    }

    const newQuery = new URLSearchParams(query).toString();
    router.push(`?${newQuery}`);
  };

  return { pushQuery, query };
};

export default useCustomRouter;
