import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Lütfen e-posta ve şifrenizi giriniz');
        }

        await connectToDatabase();
        const email = (credentials.email as string).toLowerCase().trim();
        const user = await User.findOne({ email });

        if (!user || !user.password) {
          throw new Error('Bu e-posta adresine ait bir hesap bulunamadı');
        }

        const isMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isMatch) {
          throw new Error('Geçersiz e-posta adresi veya şifre');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          await connectToDatabase();
          const email = user.email?.toLowerCase();
          if (!email) return false;

          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            await User.create({
              name: user.name || 'Morent Üyesi',
              email,
              image: user.image || '',
              provider: 'google',
              role: 'user',
            });
          }
          return true;
        } catch (err) {
          console.error('Google oturum açma hatası:', err);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || 'user';
      }

      // Ensure token.id is always the valid 24-char hex MongoDB ObjectId
      if (token.email && (!token.id || !/^[0-9a-fA-F]{24}$/.test(token.id as string))) {
        try {
          await connectToDatabase();
          const dbUser = await User.findOne({ email: (token.email as string).toLowerCase().trim() });
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.role = dbUser.role || 'user';
          }
        } catch (error) {
          console.error('Failed to resolve MongoDB user ID in jwt callback:', error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
});
