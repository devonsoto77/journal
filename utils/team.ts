import { createURL } from './api'
import { getUserByClerkID } from './auth'
import { prisma } from './db'

export const createTeam = async (content) => {
  console.log('create team', content)

  const res = await fetch(
    new Request(createURL(`/api/team`), {
      method: 'PUT',
      body: JSON.stringify({ content }),
    })
  )

  if (res.ok) {
    console.log('res ok')
    const data = await res.json()
    return data.data
  }
}

export const getTeam = async () => {
  const user = await getUserByClerkID()

  const team = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      team: true,
    },
  })

  return team?.team
}
