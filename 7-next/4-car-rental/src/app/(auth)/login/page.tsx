'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage(res.error || 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol ediniz.');
      } else {
        router.push('/vehicles');
        router.refresh();
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Giriş sırasında beklenmeyen bir hata oluştu'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-surface-container-lowest rounded-2xl shadow-xl p-6 sm:p-10 border border-surface-container-high/60">
      {/* Heading */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded bg-surface-container text-primary text-xs font-bold uppercase tracking-wider">
            Portal Erişimi
          </span>
          <div className="flex items-center gap-1.5 text-xs text-tertiary font-semibold">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Hızlı Kimlik Girişi</span>
          </div>
        </div>
        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight font-headline">
          Morent&apos;e Tekrar Hoş Geldiniz
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Rezervasyonlarınızı, telematik verilerinizi ve dijital araç anahtarlarınızı yönetmek için giriş yapın.
        </p>
      </div>

      {/* Registered Success Banner */}
      {registered && (
        <div className="mt-6 p-3.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Hesabınız başarıyla oluşturuldu! Lütfen giriş yapınız.</span>
        </div>
      )}

      {/* OAuth Action */}
      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full h-12 px-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 flex items-center justify-center gap-3 shadow-sm border border-surface-container-high group text-on-surface cursor-pointer"
        >
          <svg className="w-5 h-5 shrink-0 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-sm font-semibold text-on-surface">
            Google ile Devam Et
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex py-5 items-center">
        <div className="flex-grow h-px bg-surface-container-high"></div>
        <span className="flex-shrink mx-4 text-xs text-outline uppercase tracking-wider font-semibold">
          Veya e-posta ile giriş yapın
        </span>
        <div className="flex-grow h-px bg-surface-container-high"></div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-4 p-3.5 rounded-xl bg-error-container text-on-error-container text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-on-surface mb-1.5" htmlFor="login-email">
            E-posta Adresi
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
              mail
            </span>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@morent.com"
              className="w-full h-12 pl-11 pr-4 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-on-surface" htmlFor="login-password">
              Şifre
            </label>
            <a href="#" className="text-xs font-semibold text-primary hover:underline">
              Şifremi Unuttum?
            </a>
          </div>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
              lock
            </span>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full h-12 pl-11 pr-11 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-outline hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-on-surface-variant font-medium">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded accent-primary-container cursor-pointer"
            />
            <span>Beni 30 gün boyunca hatırla</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 px-6 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                <span>Kimlik Doğrulanıyor...</span>
              </>
            ) : (
              <>
                <span>Giriş Yap ve Anahtarları Etkinleştir</span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </div>

        {/* Sign Up Prompt */}
        <div className="text-center pt-3">
          <p className="text-xs text-on-surface-variant">
            Henüz bir Morent hesabınız yok mu?{' '}
            <Link href="/register" className="text-primary font-bold hover:underline ml-1 inline-flex items-center">
              Hemen Kaydolun
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Showcase Panel */}
        <div className="lg:col-span-5 hidden lg:flex flex-col justify-between relative rounded-2xl overflow-hidden shadow-2xl bg-inverse-surface text-inverse-on-surface p-8 sm:p-10 min-h-[640px]">
          {/* Ambient Lighting Layers */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/25 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-tertiary-fixed-dim/20 blur-3xl pointer-events-none"></div>

          {/* Top Header & Status */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest/10 backdrop-blur-md text-xs font-semibold text-primary-fixed">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
              <span>Morent VIP Executive Fleet Pass</span>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-inverse-on-surface tracking-tight leading-tight font-headline">
              Hassas mobilite, <br />
              <span className="text-primary-fixed">anında anahtarsız teslim.</span>
            </h2>
            <p className="mt-3 text-sm text-outline-variant max-w-sm leading-relaxed">
              Akıllı telefon NFC ve VIP havalimanı vale teslimatıyla Türkiye&apos;nin en seçkin lüks araçlarının kilidini anında açın.
            </p>
          </div>

          {/* Vehicle Showcase Photography Visual */}
          <div className="relative z-10 my-6 group">
            <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-2xl bg-surface-container-highest/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXpRqrdPnQ34B-nJrJ35ORfm8U7ka9ZG--QDl-QfFOTWpqD19CzXDoPC16CTNX0cw2Twj3k8DLnqgHDtlrz_odF5UQ-5VdnJxdEKDp00udld-yhRBqpGkEaTBywMroKurB9xkwWZFV_Qep7LTTD5tzW3Cwz61Msqj-jPCrrnSdMpx3fuAVvw3aav4mzBfoqYFD8e5ZW26SudIIDhgwFOpXZL45KnQ3fSDmYHUm4DY6AgWOm1uCS7Uw5Q"
                alt="BMW i7 Executive"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-lg bg-inverse-surface/80 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-fixed text-[20px]">
                    key
                  </span>
                  <span className="text-xs font-semibold text-inverse-on-surface">
                    Dijital Anahtar Aktif
                  </span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-primary-container text-on-primary font-bold">
                  BMW i7 eDrive50
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Social Proof Cluster */}
          <div className="relative z-10 pt-4 border-t border-surface-container-lowest/10">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-secondary-container">
                  <span className="material-symbols-outlined text-[18px]">star</span>
                  <span className="text-lg font-bold text-inverse-on-surface">4.9 / 5</span>
                </div>
                <span className="text-xs text-outline-variant">25.000+ doğrulanmış sürücü</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-tertiary-fixed-dim">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span className="text-lg font-bold text-inverse-on-surface">FastPass™</span>
                </div>
                <span className="text-xs text-outline-variant">Sıfır bekleme, vale teslimat</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs text-outline-variant/80">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-tertiary-fixed">
                  lock
                </span>
                Uçtan Uca Şifreli Telematik Kasası
              </span>
              <span className="font-mono">v4.18.2</span>
            </div>
          </div>
        </div>

        {/* Right Form Container with Suspense boundary */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <Suspense
            fallback={
              <div className="w-full max-w-xl mx-auto bg-surface-container-lowest rounded-2xl shadow-xl p-10 flex items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-primary text-[32px]">
                  sync
                </span>
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
