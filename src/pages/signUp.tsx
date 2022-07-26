import SignUp from 'components/RegisterForms/SignUp'
import { SignInTemplate } from 'templates/SignIn'

export default function signIn() {
  return (
    <SignInTemplate>
      <SignUp />
    </SignInTemplate>
  )
}
