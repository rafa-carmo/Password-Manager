import { Password } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { HomeTemplate } from 'templates/Home'

import { getAPIClient } from '../../services/axios'

interface DashboardProps {
  passwords?: Password[]
}
// const Home = ({ users }: HomeProps) => {
const Home = ({ passwords }: DashboardProps) => {
  console.log(passwords)
  return <HomeTemplate />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { 'passwordManager.token': token } = parseCookies(ctx)
  // console.log(apiClient.defaults.headers.common)

  if (!token) {
    return {
      redirect: {
        destination: '/signIn',
        permanent: false
      }
    }
  }

  const passwordsRequest = await apiClient.get('/api/passwords')
  const passwords = passwordsRequest.data
  // const res = await fetch('http://localhost:3001/api/users')
  // const users = await res.json()

  // console.log(users)
  return {
    props: {
      passwords
    }
  }
}

export default Home
