import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { HomeProps, HomeTemplate } from 'templates/Home'

import { getAPIClient } from '../../services/axios'

interface DashboardProps {
  home: HomeProps
}
// const Home = ({ users }: HomeProps) => {
const Home = ({ home }: DashboardProps) => {
  return <HomeTemplate {...home} />
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
      home: {
        table: {
          rows: passwords
        }
      }
    }
  }
}

export default Home
