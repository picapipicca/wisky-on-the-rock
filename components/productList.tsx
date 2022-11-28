import useSWR from "swr";
import ItemLayout from "./item";
import { ItemResponseWithLikeProps } from "../pages/index";

interface ProductListProps {
  type: "purchases" | "sells" | "likes";
}

interface RecordProps {
  id: number;
  item: ItemResponseWithLikeProps;
}

interface ProductListResponseProps {
  [key: string]: RecordProps[];
}

const ProductList = ({ type }: ProductListProps) => {
  const { data } = useSWR<ProductListResponseProps>(
    `/api/users/profile/${type}`
  );
  return data ? (
    <>
      {data[type]?.map((record) => (
        <ItemLayout
          key={record.id}
          title={record.item.name}
          price={record.item.price}
          id={record.id}
          likeNum={record.item._count.likes}
        />
      ))}
    </>
  ) : null;
};

export default ProductList;
