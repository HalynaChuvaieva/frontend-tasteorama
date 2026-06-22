import css from './RegisterPage.module.css';
import RegistrationForm from '@/components/RegisterForm/RegistrationForm';

export default function Register() {
  return (
    <div className={css.mainContent}>
    <RegistrationForm/>
  </div>
  )
  
  
}
