/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY

const nextConfig = {
  reactStrictMode: true,

  // url 변경을 유저가 감지
  async redirects(){
    return [
      {
        // /contact url 입력 시 /form으로 리다이렉트
        source:"/contact",
        destination:"/form",
        permanent:false,
      },
      {
       // path 설정
        source:"/old-blog/:path",
        destination:"/new-blog/:path",
        permanent:false,
      }
    ]
  },

  // 유저가 url을 볼 수 없어, API Key 숨길 수 있음
  async rewrites() {
    return [{
      source: "/api/movies",
      destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    },
    {
      source: "/api/movies/:id",
      destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
    },]
  }
}

module.exports = nextConfig
