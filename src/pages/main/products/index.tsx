import { ScrollProduct } from "@/Components/Common/ScrollProduct";
import { ProductCard } from "@/Components/Main/Products/ProductCard";
import { TabGroup } from "@/Components/Main/Products/TabGroup";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from "./index.module.css";
import useSWR, { mutate } from "swr";
import { getCategories, getProducts } from "@/services";
import { ProductProps } from "@/types";
import { LIMIT_PAGE_PRODUCT } from "@/config/constants";

const keyCategory = "CATEGORIES";
const keyProduct = "PRODUCTS";

export default function Products() {
  const { data: categories } = useSWR(keyCategory, () => getCategories());
  const { data: listProduct, isLoading: loadingProducts } = useSWR(keyProduct, () => getData({}));
  const router = useRouter();
  const keyword = router.query.keyword as string;
  const [currentTab, setCurrentTab] = useState("all");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<ProductProps[]>([]);

  const getData = useCallback(
    async ({ tabKey, sortKey }: { tabKey?: string; sortKey?: string; keyword?: string }) => {
      return await getProducts({
        categoryId: tabKey ?? currentTab,
        orderByPrice: sortKey ?? sort,
        page: page,
        keyWord: keyword ?? "",
      });
    },
    [currentTab, page, sort, keyword],
  );

  const onFilter = useCallback(
    async ({ tabKey, sortKey, keyword }: { tabKey?: string; sortKey?: string; keyword?: string }) => {
      const products = await getData({ tabKey, sortKey, keyword });
      mutate(keyProduct, products);
    },
    [getData],
  );

  useEffect(() => {
    keyword && onFilter({ keyword });
  }, [keyword]);

  useEffect(() => {
    if (listProduct) {
      setTotal(listProduct.totalResult ?? 0);
      setProducts(listProduct.data ?? []);
    }
  }, [listProduct]);

  const handleTabClick = useCallback(
    (tabKey: string) => {
      setCurrentTab(tabKey);
      router.push("/main/products?tab=" + tabKey);
      onFilter({ tabKey: tabKey });
    },
    [onFilter, router],
  );

  const handleChangeSort = (value: string | null) => {
    setSort(value ?? "");
    onFilter({ sortKey: value ?? "" });
  };

  const fetchMoreData = async () => {
    if (page * LIMIT_PAGE_PRODUCT < total) {
      setPage(page + 1);
      onFilter({});
    }
  };

  return (
    <div className={styles.container}>
      <TabGroup
        listCategory={categories}
        currentTab={currentTab}
        onTabClick={handleTabClick}
        sort={sort}
        onChangeSort={handleChangeSort}
      />

      <ScrollProduct
        loading={loadingProducts}
        data={products}
        fetchMoreData={fetchMoreData}
        hasMore={page * LIMIT_PAGE_PRODUCT < total}
        emptyMessage="There is no data!"
        renderComponent={(index: number, product: ProductProps) => <ProductCard key={index} product={product} />}
        containerClassName={styles.scroll}
      />
    </div>
  );
}

Products.layout = "Menu";
