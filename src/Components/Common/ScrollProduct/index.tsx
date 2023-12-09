import { Loader } from "@/Components/Common/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./index.module.css";
import { CSSProperties } from "react";
import { EmptyMessage } from "@/Components/Common/ScrollProduct/EmptyMessage";
import typo from "@/styles/text.module.css";
import { Text } from "@mantine/core";

type ScrollProductProps<T> = {
  loading: boolean;
  data?: T[];
  fetchMoreData: () => void;
  hasMore: boolean;
  containerStyle?: CSSProperties;
  containerClassName?: string;
  scrollStyle?: CSSProperties;
  scrollClassName?: string;
  emptyMessage?: string;
  renderComponent: (index: number, item: T) => JSX.Element;
};

export function ScrollProduct<T>({
  loading,
  data,
  fetchMoreData,
  hasMore,
  containerStyle,
  containerClassName,
  scrollStyle,
  scrollClassName,
  emptyMessage,
  renderComponent,
}: ScrollProductProps<T>) {
  return (
    <div className={`${styles.container} ${containerClassName}`} style={{ ...(containerStyle || {}) }}>
      {loading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={data?.length || 0}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={
            data?.length !== 0 ? (
              <Text className={`${typo.size_18_600} ${styles.finalMessage}`}>All is shown!</Text>
            ) : null
          }
          refreshFunction={() => null}
          scrollThreshold={0.5}
          style={{ ...(scrollStyle || {}) }}
          className={scrollClassName}
        >
          <div className={styles.grid}>
            {data &&
              data.length > 0 &&
              data.map((item: T, index: number) => (
                <div key={index} className={styles.gridItem}>
                  {renderComponent(index, item)}
                </div>
              ))}
          </div>

          {data?.length === 0 && <EmptyMessage message={emptyMessage} />}
        </InfiniteScroll>
      )}
    </div>
  );
}
