import SignIn from 'components/RegisterForms/SignIn'
import { GetServerSideProps } from 'next'
import { SignInTemplate } from 'templates/SignIn'

export default function signIn() {
  return (
    <SignInTemplate>
      <SignIn />
    </SignInTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {}
  }
}
