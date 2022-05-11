import Seo from "../../components/Seo";
import { useRouter } from "next/router";

export default function Detail({ params }) {
  const router = useRouter();
  const [title, id] = params || [];
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}

// router의 params는 서버에 존재하지 않기 때문에, SSR로 진행하기 위해서 getServerSideProps 활용
export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}