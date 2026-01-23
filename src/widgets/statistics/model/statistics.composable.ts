import { computed, ref } from 'vue'
import { type Movie, movies as data } from '@/entities/movie'

type StatisticsParams = {
  users: number
  movies: number
}

export function useStatistics({ users, movies }: StatisticsParams) {
  const moviesList = ref<Movie[]>(data)

  const totalMovies = computed<number>(() => moviesList.value.length)

  const topMovies = computed<Movie[]>(() => {
    return moviesList.value
      .filter((movie) => Boolean(movie.chat) && !isNaN(Number(movie.chat)))
      .sort((a, b) => (Number(b.chat) ?? 0) - (Number(a.chat) ?? 0))
      .slice(0, movies)
  })

  const topUsers = computed<{ nick: string; count: number }[]>(() => {
    const nicknameCount: Record<string, number> = {}

    moviesList.value.forEach((movie) => {
      if (!movie.nick) return
      const nicks = movie.nick
        .split('+')
        .map((n) => n.trim())
        .filter(Boolean)
      nicks.forEach((nick) => {
        nicknameCount[nick] = (nicknameCount[nick] || 0) + 1
      })
    })

    return Object.entries(nicknameCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, users)
      .map(([nick, count]) => ({ nick, count }))
  })

  return {
    totalMovies,
    topMovies,
    topUsers,
  }
}
