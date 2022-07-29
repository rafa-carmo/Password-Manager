import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { getUser } from 'server/users'
import { SettingsTemplate } from 'templates/Settings'
import { SettingsTemplateProps } from 'templates/Settings/'

interface SettingsPorps {
  settings: SettingsTemplateProps
}

export default function Settings({ settings }: SettingsPorps) {
  return <SettingsTemplate {...settings} />
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
  const data = await getUser(token)
  return {
    props: {
      settings: data
    }
  }
}
