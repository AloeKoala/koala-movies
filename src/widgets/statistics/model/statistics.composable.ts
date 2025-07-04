import { computed, ref } from 'vue'
import { type Movie, movies as data } from '@/entities/movie'

export function useStatistics() {
  const movies = ref<Movie[]>(data)

  const totalMovies = computed<number>(() => movies.value.length)

  const top3MoviesByChatRating = computed<Movie[]>(() => {
    return movies.value
      .filter(movie => Boolean(movie.chat) && !isNaN(Number(movie.chat)))
      .sort((a, b) => (Number(b.chat) ?? 0) - (Number(a.chat) ?? 0))
      .slice(0, 3)
  })

  const top3Nicknames = computed<{ nick: string; count: number }[]>(() => {
    const nicknameCount: Record<string, number> = {}

    movies.value.forEach(movie => {
      if (!movie.nick) return
      const nicks = movie.nick.split('+').map(n => n.trim()).filter(Boolean)
      nicks.forEach(nick => {
        nicknameCount[nick] = (nicknameCount[nick] || 0) + 1
      })
    })

    return Object.entries(nicknameCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([nick, count]) => ({ nick, count }))
  })

  return {
    totalMovies,
    top3MoviesByChatRating,
    top3Nicknames,
  }
}
