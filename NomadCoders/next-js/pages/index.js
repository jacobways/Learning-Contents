import { useState, useEffect } from "react"
import { useRouter } from "next/router";
import Link from "next/link"
import Seo from "../components/Seo"

export default function Home({results}) {

  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };

  return (
    <div className="container">
      <Seo title="Home" />

      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>
            <Link href={`/movies/${movie.original_title}/${movie.id}`}>
              <a>{movie.original_title}</a>
            </Link>
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

// 함수명을 바꾸면 안 됨! 중요함
export async function getServerSideProps() {
  // 여기 코드는 서버 쪽에서만 작동함
  // 여기 API Key를 숨길 수도 있음
  const { results } = await (await fetch(`http://localhost:3000/api/movies`)).json();
  return {

    // results를 props로서 Home 컴포넌트에게 전달하게 됨
    props: {
      results,
    },
  }

}
