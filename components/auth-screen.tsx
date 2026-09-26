'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent, type ReactNode } from 'react'
import { Mail } from 'lucide-react'
import { volkhov } from '@/styles/fonts'

export type AuthMode = 'login' | 'register' | 'forgot' | 'verify' | 'reset'

const fieldClass = 'w-full border-0 border-b border-[#cfcfcf] bg-transparent px-0 py-3 text-sm text-[#333] outline-none placeholder:text-[#aaa] focus:border-black'
const buttonClass = 'flex h-11 w-full items-center justify-center rounded-md bg-black px-4 text-sm text-white shadow-[0_10px_20px_rgba(0,0,0,.14)] transition hover:bg-[#292929] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
const outlineButtonClass = 'flex h-10 items-center justify-center gap-2 rounded border border-[#c8d2f3] px-3 text-[11px] text-[#555] transition hover:bg-[#f8f9ff]'

function GoogleMark() {
  return <span aria-hidden="true" className="font-sans text-lg font-bold leading-none" style={{ background: 'conic-gradient(from -45deg,#4285f4 0 25%,#34a853 25% 45%,#fbbc05 45% 65%,#ea4335 65% 82%,#4285f4 82%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>G</span>
}

function AuthLinks({ children }: { children: ReactNode }) {
  return <p className="mt-5 text-center text-xs text-[#333]">{children}</p>
}

export default function AuthScreen({ mode }: { mode: AuthMode }) {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const title = mode === 'login' ? 'Sign In To FASCO' : mode === 'register' ? 'Create Account' : mode === 'forgot' ? 'Forget Password' : mode === 'verify' ? 'Enter The Confirmation Code' : 'Enter Your New Password'
  const image = mode === 'register' ? '/assets/auth/signupgirl.png' : '/assets/auth/signingirl.png'

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (mode === 'register' || mode === 'reset') {
      if (formData.get('password') !== formData.get('confirmPassword')) {
        setMessage('The passwords do not match. Please try again.')
        return
      }
    }
    if (mode === 'forgot') {
      const email = String(formData.get('email') || '')
      router.push(`/verify-code?email=${encodeURIComponent(email)}`)
    } else if (mode === 'verify') {
      router.push('/reset-password')
    } else if (mode === 'reset') {
      setMessage('Password updated in this preview. Connect an authentication service to save it.')
    } else if (mode === 'register') {
      setMessage('Account creation is ready to connect to your authentication service.')
    } else {
      setMessage('Sign-in is ready to connect to your authentication service.')
    }
  }

  return <main className="flex min-h-[calc(100svh-16px)] w-full items-center justify-center px-4 py-6 sm:px-8 md:px-12 md:py-10">
    <section className="grid w-full max-w-[1320px] overflow-hidden rounded-[18px] border border-[#e6e6e6] bg-white md:min-h-[min(76svh,760px)] md:grid-cols-2" aria-label={title}>
      <div className="relative min-h-[230px] overflow-hidden sm:min-h-[300px] md:min-h-full">
        <Image src={image} alt="FASCO fashion model" fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center" />
      </div>
      <div className="relative flex min-h-[520px] flex-col items-center px-7 py-8 sm:px-12 md:min-h-0 md:px-[13%] md:py-10 lg:px-[15%]">
        <Link href="/" className={`${volkhov.className} text-[32px] text-[#484848] md:text-[38px]`}>FASCO</Link>
        <div className="my-auto w-full max-w-[440px] py-8">
          <h1 className={`${volkhov.className} mb-5 text-lg text-black`}>{title}</h1>

          {(mode === 'login' || mode === 'register') && <div className="mb-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => setMessage('Google sign-in is not connected yet.')} className={outlineButtonClass}><GoogleMark /> Continue with Google</button>
            <Link href={mode === 'login' ? '/register' : '/login'} className={outlineButtonClass}><Mail className="size-4 text-[#ef4b43]" /> {mode === 'login' ? 'Sign up with Email' : 'Sign in with Email'}</Link>
          </div>}

          {(mode === 'login' || mode === 'register') && <div className="mb-7 flex items-center gap-3 text-xs font-semibold tracking-widest text-[#888]"><span className="h-px flex-1 bg-[#dedede]" />OR<span className="h-px flex-1 bg-[#dedede]" /></div>}

          <form onSubmit={onSubmit} className="space-y-3">
            {mode === 'login' && <>
              <label className="sr-only" htmlFor="auth-email">Email</label><input className={fieldClass} id="auth-email" name="email" type="email" autoComplete="email" placeholder="Email" required />
              <label className="sr-only" htmlFor="auth-password">Password</label><input className={fieldClass} id="auth-password" name="password" type="password" autoComplete="current-password" placeholder="Password" required />
              <button className={`${buttonClass} mt-5`} type="submit">Sign In</button>
              <div className="flex justify-end"><Link className="text-[11px] font-semibold text-[#5b80df] hover:underline" href="/forgot-password">Forgot Password?</Link></div>
              <AuthLinks>New to FASCO? <Link className="font-medium text-[#5b80df] hover:underline" href="/register">Register Now</Link></AuthLinks>
            </>}

            {mode === 'register' && <>
              <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
                <label className="sr-only" htmlFor="first-name">First name</label><input className={fieldClass} id="first-name" name="firstName" placeholder="First Name" autoComplete="given-name" required />
                <label className="sr-only" htmlFor="last-name">Last name</label><input className={fieldClass} id="last-name" name="lastName" placeholder="Last Name" autoComplete="family-name" required />
                <label className="sr-only" htmlFor="register-email">Email address</label><input className={fieldClass} id="register-email" name="email" type="email" placeholder="Email Address" autoComplete="email" required />
                <label className="sr-only" htmlFor="phone">Phone number</label><input className={fieldClass} id="phone" name="phone" type="tel" placeholder="Phone Number" autoComplete="tel" />
                <label className="sr-only" htmlFor="register-password">Password</label><input className={fieldClass} id="register-password" name="password" type="password" placeholder="Password" autoComplete="new-password" minLength={8} required />
                <label className="sr-only" htmlFor="confirm-password">Confirm password</label><input className={fieldClass} id="confirm-password" name="confirmPassword" type="password" placeholder="Confirm Password" autoComplete="new-password" minLength={8} required />
              </div>
              <button className={`${buttonClass} mt-5`} type="submit">Create Account</button>
              <AuthLinks>Already have an account? <Link className="font-medium text-[#5b80df] hover:underline" href="/login">Login</Link></AuthLinks>
            </>}

            {mode === 'forgot' && <>
              <p className="mb-5 text-xs leading-5 text-[#888]">Enter your account email and we’ll guide you through the recovery steps.</p>
              <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
                <label className="sr-only" htmlFor="forgot-first">First name</label><input className={fieldClass} id="forgot-first" name="firstName" placeholder="First Name" autoComplete="given-name" required />
                <label className="sr-only" htmlFor="forgot-last">Last name</label><input className={fieldClass} id="forgot-last" name="lastName" placeholder="Last Name" autoComplete="family-name" required />
                <label className="sr-only" htmlFor="forgot-email">Email address</label><input className={fieldClass} id="forgot-email" name="email" type="email" placeholder="Email Address" autoComplete="email" required />
                <label className="sr-only" htmlFor="forgot-phone">Phone number</label><input className={fieldClass} id="forgot-phone" name="phone" type="tel" placeholder="Phone Number" autoComplete="tel" required />
              </div>
              <button className={`${buttonClass} mt-5`} type="submit">Send Confirmation Code</button>
              <AuthLinks>Already have an account? <Link className="font-medium text-[#5b80df] hover:underline" href="/login">Login</Link></AuthLinks>
            </>}

            {mode === 'verify' && <>
              <label className="sr-only" htmlFor="confirmation-code">Confirmation code</label><input className={fieldClass} id="confirmation-code" name="code" inputMode="numeric" autoComplete="one-time-code" placeholder="Confirmation Code" required />
              <button className={`${buttonClass} mt-5`} type="submit">Recover Account</button>
              <AuthLinks>Didn’t receive a code? <button type="button" onClick={() => setMessage('Code resend is not connected in this preview.')} className="font-medium text-[#5b80df] hover:underline">Resend Now</button></AuthLinks>
            </>}

            {mode === 'reset' && <>
              <label className="sr-only" htmlFor="new-password">New password</label><input className={fieldClass} id="new-password" name="password" type="password" autoComplete="new-password" placeholder="New Password" minLength={8} required />
              <label className="sr-only" htmlFor="new-password-confirm">Confirmation password</label><input className={fieldClass} id="new-password-confirm" name="confirmPassword" type="password" autoComplete="new-password" placeholder="Confirmation Password" minLength={8} required />
              <button className={`${buttonClass} mt-5 bg-[#5c82e7] hover:bg-[#466dd3]`} type="submit">Submit</button>
              {message && <p role="status" className="mt-3 text-xs leading-5 text-[#555]">{message} <Link className="text-[#5b80df] underline" href="/login">Sign in</Link></p>}
            </>}
          </form>
          {message && mode !== 'reset' && <p role="status" className="mt-4 text-center text-xs leading-5 text-[#666]">{message}</p>}
        </div>
        <p className="mt-auto self-end text-[10px] text-black">FASCO <Link href="/terms" className="hover:underline">Terms &amp; Conditions</Link></p>
      </div>
    </section>
  </main>
}
