import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { getAPIClient } from 'services/axios'
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
  const apiClient = getAPIClient(ctx)
  const requestData = await apiClient.get('/api/users/signIn')
  const data = requestData.data as SettingsTemplateProps
  return {
    props: {
      settings: data
    }
  }
}
