'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface CountryCode {
  flag: string;
  code: string;
  name: string;
}

const COUNTRIES: CountryCode[] = [
  { flag: '🇹🇷', code: '+90', name: 'Türkiye' },
  { flag: '🇺🇸', code: '+1', name: 'Amerika Birleşik Devletleri' },
  { flag: '🇩🇪', code: '+49', name: 'Almanya' },
  { flag: '🇬🇧', code: '+44', name: 'Birleşik Krallık' },
  { flag: '🇦🇿', code: '+994', name: 'Azerbaycan' },
];

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Password strength calculation
  const getPasswordStrength = (val: string) => {
    if (!val) return { score: 0, text: 'En az 8 karakter', color: 'text-outline' };
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val) && val.length >= 10) score++;

    if (score <= 1) return { score: 1, text: 'Zayıf (Rakam ve sembol ekleyin)', color: 'text-error' };
    if (score === 2) return { score: 2, text: 'Orta seviye şifre', color: 'text-amber-500' };
    return { score: 3, text: 'Güçlü güvenlik derecesi', color: 'text-emerald-500' };
  };

  const strength = getPasswordStrength(password);
  const isMatch = repeatPassword.length > 0 && password === repeatPassword;
  const isMismatch = repeatPassword.length > 0 && password !== repeatPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== repeatPassword) {
      setErrorMessage('Girdiğiniz şifreler birbiriyle eşleşmiyor.');
      return;
    }

    if (!termsAccepted) {
      setErrorMessage('Lütfen kullanım ve gizlilik koşullarını kabul ediniz.');
      return;
    }

    setLoading(true);

    try {
      const fullPhone = `${selectedCountry.code} ${phone.trim()}`;
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: fullPhone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Kayıt işlemi sırasında bir hata oluştu');
      }

      setSuccessMessage('Hesabınız başarıyla oluşturuldu! Giriş yapılıyor...');

      // Auto sign-in with Credentials
      const signInRes = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        // If auto sign-in has an issue, route to login page
        router.push('/login?registered=true');
      } else {
        router.push('/vehicles');
        router.refresh();
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Kayıt oluşturulurken bir hata oluştu'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      {/* Breadcrumb & FastPass Info */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
          <Link
            href="/vehicles"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Filoya Dön
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="text-primary">FastPass Dijital Kayıt</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-xs font-semibold text-on-surface">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>
            Ortalama onay süresi: <strong>45 saniye</strong>
          </span>
        </div>
      </div>

      {/* Main Registration Card */}
      <div className="w-full max-w-xl mx-auto bg-surface-container-lowest rounded-2xl shadow-xl p-6 sm:p-10 relative overflow-hidden border border-surface-container-high/60">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-primary/10 via-primary-container/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        {/* Heading */}
        <div className="mb-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            Anında Anahtarsız Teslimat
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight font-headline mb-2">
            Hesabınızı Oluşturun
          </h1>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Seçkin Morent sürücüleri arasına katılın. Havalimanı bankoları veya evrak kuyrukları olmadan lüks araçları anında kiralayın.
          </p>
        </div>

        {/* OAuth Action */}
        <div className="mb-6 relative z-10">
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full h-12 px-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 flex items-center justify-center gap-3 shadow-sm border border-surface-container-high group cursor-pointer"
          >
            <svg className="w-5 h-5 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
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
            <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
              Google ile Kayıt Ol
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow h-px bg-surface-container-high"></div>
          <span className="flex-shrink mx-4 text-xs text-outline uppercase tracking-wider font-semibold">
            Veya e-posta ile kaydolun
          </span>
          <div className="flex-grow h-px bg-surface-container-high"></div>
        </div>

        {/* Feedback Banners */}
        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-error-container text-on-error-container text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {/* Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5" htmlFor="first-name">
                Ad <span className="text-error">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  person
                </span>
                <input
                  id="first-name"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ahmet"
                  className="w-full h-12 pl-11 pr-4 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5" htmlFor="last-name">
                Soyad <span className="text-error">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  badge
                </span>
                <input
                  id="last-name"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Yılmaz"
                  className="w-full h-12 pl-11 pr-4 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5" htmlFor="email">
              E-posta Adresi <span className="text-error">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                mail
              </span>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ahmet.yilmaz@morent.com"
                className="w-full h-12 pl-11 pr-4 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Phone Number with Country Code */}
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5" htmlFor="phone">
              Cep Telefonu <span className="text-error">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                  className="h-12 px-3 bg-surface-container-low hover:bg-surface-container rounded-xl flex items-center gap-2 text-xs font-semibold text-on-surface transition-colors cursor-pointer"
                >
                  <span className="text-[18px]">{selectedCountry.flag}</span>
                  <span>{selectedCountry.code}</span>
                  <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
                </button>
                {countryDropdownOpen && (
                  <div className="absolute top-14 left-0 z-30 w-52 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-high py-1.5 text-xs">
                    {COUNTRIES.map((c) => (
                      <div
                        key={c.code}
                        onClick={() => {
                          setSelectedCountry(c);
                          setCountryDropdownOpen(false);
                        }}
                        className="px-3 py-2 hover:bg-surface-container-low flex items-center gap-2.5 cursor-pointer"
                      >
                        <span className="text-[18px]">{c.flag}</span>
                        <span className="font-semibold text-on-surface">{c.code}</span>
                        <span className="text-outline truncate">{c.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative flex-1 flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  phone_iphone
                </span>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="532 123 4567"
                  className="w-full h-12 pl-11 pr-4 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:outline-none transition-all"
                />
              </div>
            </div>
            <p className="mt-1 text-[11px] text-outline">
              Yalnızca dijital anahtar teslimatı ve FastPass bildirimleri için kullanılır.
            </p>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-on-surface" htmlFor="password">
                Şifre Belirleyin <span className="text-error">*</span>
              </label>
              <span className={`text-[11px] font-medium ${strength.color}`}>
                {strength.text}
              </span>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                lock
              </span>
              <input
                id="password"
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
            {/* Strength Meter Bar */}
            <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden flex">
              <div
                className={`h-full w-1/3 transition-all duration-300 ${
                  strength.score >= 1
                    ? strength.score === 1
                      ? 'bg-error'
                      : strength.score === 2
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                    : 'bg-transparent'
                }`}
              ></div>
              <div
                className={`h-full w-1/3 transition-all duration-300 border-l border-surface-container-lowest ${
                  strength.score >= 2
                    ? strength.score === 2
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                    : 'bg-transparent'
                }`}
              ></div>
              <div
                className={`h-full w-1/3 transition-all duration-300 border-l border-surface-container-lowest ${
                  strength.score >= 3 ? 'bg-emerald-500' : 'bg-transparent'
                }`}
              ></div>
            </div>
          </div>

          {/* Repeat Password */}
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5" htmlFor="repeat-password">
              Şifre Tekrarı <span className="text-error">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                lock_reset
              </span>
              <input
                id="repeat-password"
                type={showRepeatPassword ? 'text' : 'password'}
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-12 pl-11 pr-11 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:outline-none transition-all"
              />
              <div className="absolute right-3.5 flex items-center gap-1.5">
                {isMatch && (
                  <span className="material-symbols-outlined text-[20px] text-emerald-500">
                    check_circle
                  </span>
                )}
                {isMismatch && (
                  <span className="material-symbols-outlined text-[20px] text-error">
                    cancel
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  className="text-outline hover:text-on-surface transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showRepeatPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
            {isMismatch && (
              <p className="text-[11px] text-error mt-1 font-medium">Şifreler eşleşmiyor</p>
            )}
          </div>

          {/* FastPass Advantage Card */}
          <div className="p-3.5 rounded-xl bg-surface-container-low flex items-start gap-3 mt-3">
            <div className="p-1.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed shrink-0">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-on-surface">FastPass™ Sürücü Doğrulaması Dahil</p>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Anında ehliyet onayı sayesinde doğrudan akıllı telefonunuzla aracı açın ve kiralama bankosunu tamamen atlayın.
              </p>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded accent-primary-container cursor-pointer"
              />
              <span className="text-xs text-on-surface-variant leading-relaxed">
                Morent&apos;in{' '}
                <a href="#" className="text-primary font-semibold hover:underline">
                  Kullanım Şartları
                </a>{' '}
                ve{' '}
                <a href="#" className="text-primary font-semibold hover:underline">
                  Gizlilik Politikası
                </a>
                &apos;nı okudum, FastPass kiralama standartlarını kabul ediyorum.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 px-6 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                  <span>FastPass Profili Oluşturuluyor...</span>
                </>
              ) : (
                <>
                  <span>Morent Hesabı Oluştur</span>
                  <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Link to Sign In */}
          <div className="text-center pt-2">
            <p className="text-xs text-on-surface-variant">
              Zaten bir Morent hesabınız var mı?{' '}
              <Link href="/login" className="text-primary font-bold hover:underline ml-1 inline-flex items-center">
                Giriş Yap
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
