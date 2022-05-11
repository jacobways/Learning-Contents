// 라우팅 시 변수명 : 파일명의 [] 안에 넣어주기

import { useRouter } from "next/router";

export default function PaymentDetailsBase() {
  const router = useRouter();
  console.log(router)
  return (
    <div>
      <h4>{router.query.title || "Loading..."}</h4>
    </div>
  );
}

