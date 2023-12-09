import { Loader } from "@/Components/Common/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./index.module.css";
import { CSSProperties } from "react";
import { EmptyMessage } from "@/Components/Common/Scroll/EmptyMessage";

type ScrollProps<T> = {
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

export function Scroll<T>({
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
}: ScrollProps<T>) {
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
          endMessage={null}
          refreshFunction={() => null}
          scrollThreshold={0.5}
          style={{ ...(scrollStyle || {}) }}
          className={scrollClassName}
        >
          {(data || []).map((item: T, index: number) => renderComponent(index, item))}

          {data?.length === 0 && <EmptyMessage message={emptyMessage} />}
        </InfiniteScroll>
      )}
    </div>
  );
}
