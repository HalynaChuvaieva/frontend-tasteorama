'use client';
import { useAuthStore } from '@/lib/store/authStore';
import css from './RegistrationForm.module.css'
import { register, RegisterRequest } from '@/lib/api/clientApi'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useId, useState } from 'react'
import * as Yup from 'yup'
import Link from 'next/link';
import { showErrorToast, showSuccessToast } from '@/lib/utils/toast';
import { isAxiosError } from 'axios';

type RegistrationValues = RegisterRequest
interface RegisterRequestValues {
name: string,
    email: string,
  password: string,
  confirmation:string,
}

const initialValues: RegisterRequestValues = {
    name: "",
    email: "",
  password: "",
  confirmation:"",
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .max(16, 'Maximum 16 characters')
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .max(128, 'Maximum 128 characters')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Minimum 8 characters')
        .max(128, 'Maximum 128 characters')
    .required('Password is required'),
  confirmation: Yup.string()
    .test('passwords-match', "Passwords must match", function (value) {
      return this.parent.password === value
    })
  .required('You must confirm your password')
})

const RegistrationForm = ()=>{
    const fieldId = useId();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
    

  const handleSubmit = async (values:RegistrationValues
  )=>{
    try {
      setIsSubmitting(true)
      const res = await register(values)

      if (res) {
        setUser(res);
        showSuccessToast('Successfully registered!');
        router.push('/');
      }
    }
      catch (error) {
        if (isAxiosError(error)) {
                const backendError =
                  error.response?.data?.response?.message || error.message;
                showErrorToast(backendError);
              } else {
                showErrorToast((error as Error).message || 'Internal Server Error');
              }
      } finally {
              setIsSubmitting(false)

    }
  }

    return(
    <Formik
        initialValues={ initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (

        
          <Form className={css.form}>
            <h1 className={css.formTitle}>Register</h1>
            <p className={css.formDescription}>
              Join our community of culinary enthusiasts, save your favorite recipes, and share your cooking creations
            </p>
            <div className={css.formComponent}>
              <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-name`}>
                  Enter your name
                </label>
                <Field
                  type="text"
                  name="name"
                  id={`${fieldId}-name`}
                  placeholder="Max"
                  className={`${css.input} ${(touched.name && errors.name?css.inputError:"")}`}
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.error}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-email`}>
                  Enter your email address
                </label>
                <Field
                  type="email"
                  name="email"
                  id={`${fieldId}-email`}
                  placeholder="email@gmail.com"
                  className={`${css.input} ${(touched.email && errors.email?css.inputError:"")}`}
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.error}
                />
              </div>

              <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-password`}>
                  Create a strong password
                </label>
                <div className={css.passwordWrapper}>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id={`${fieldId}-password`}
                    placeholder="*********"
                    className={`${css.input} ${(touched.password && errors.password?css.inputError:"")}`}
                  />
                  <button
                    type="button"
                    className={css.eyeButton}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <svg className={css.eyeIcon} height={24} width={24}>
                      <use
                        href={
                          showPassword
                            ? '/icons/eye.svg'
                            : '/icons/eye-crossed.svg'
                        }
                      />
                    </svg>
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.error}
                />
              </div>

              <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-confirmation`}>
                  Repeat your password
                </label>
                <div className={css.passwordWrapper}>
                  <Field
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmation"
                    id={`${fieldId}-confirmation`}
                    placeholder="*********"
                    className={`${css.input} ${(touched.confirmation && errors.confirmation?css.inputError:"")}`}
                  />
                  <button
                    type="button"
                    className={css.eyeButton}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    <svg className={css.eyeIcon} height={24} width={24}>
                      <use
                        href={
                          showConfirmPassword
                            ? '/icons/eye.svg'
                            : '/icons/eye-crossed.svg'
                        }
                      />
                    </svg>
                  </button>
                </div>
                <ErrorMessage
                  name="confirmation"
                  component="span"
                  className={css.error}
                />
              </div>
              <button
                type="submit"
                className={css.actionsButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Loading...' : 'Create account'}
              </button>
            </div>
            <p className={css.footerText}>
              Already have an account?&nbsp;
              <Link href="/auth/login" className={css.loginLink}>
                Log in
              </Link>
            </p>
          </Form>
        )}
    </Formik>)
}

export default RegistrationForm