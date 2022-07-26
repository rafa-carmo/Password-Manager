import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { getPasswords } from 'server/passwords'
import { HomeProps, HomeTemplate } from 'templates/Home'

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

  const passwords = await getPasswords(token)

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
