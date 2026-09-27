import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, name, email, password, phone } = body;

    const fullName = (name || `${firstName || ''} ${lastName || ''}`).trim();

    if (!fullName) {
      return NextResponse.json(
        { success: false, error: 'Ad ve soyad alanı zorunludur' },
        { status: 400 }
      );
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Geçerli bir e-posta adresi giriniz' },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: 'Şifreniz en az 8 karakter uzunluğunda olmalıdır',
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bu e-posta adresi ile kayıtlı bir hesap zaten bulunmaktadır',
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name: fullName,
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone?.trim() || '',
      role: 'user',
      provider: 'credentials',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Hesabınız başarıyla oluşturuldu',
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Registration API error:', error);
    const message =
      error instanceof Error ? error.message : 'Sunucu hatası oluştu';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
