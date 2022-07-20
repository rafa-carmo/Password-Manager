import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { HomeProps, HomeTemplate } from 'templates/Home'

import { getAPIClient } from '../../services/axios'

interface DashboardProps {
  home: HomeProps
}
const Home = ({ home }: DashboardProps) => {
  return <HomeTemplate {...home} />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'passwordManager.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/signIn',
        permanent: false
      }
    }
  }
  const apiClient = getAPIClient(ctx)
  const passwordsRequest = await apiClient.get('/api/passwords')
  const passwords = passwordsRequest.data

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
