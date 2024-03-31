
import LoginForm from '../components/Auth/LoginForm'
import Header from '../components/Header/Header'
import SimpleBottomNavigation from '../components/Footer/BottomNav'

function LoginPage() {
  return (
    <div>
      <Header/>
      <LoginForm/>
      <SimpleBottomNavigation/>
    </div>
  )
}

export default LoginPage