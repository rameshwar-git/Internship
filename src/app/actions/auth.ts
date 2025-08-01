'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';

const signupSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1,'Require Role.'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.string().min(1,'Role Required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const db = await connectToDatabase();
const usersCollection = db.collection('users');

export async function signup(input: z.infer<typeof signupSchema>) {
  try {
    const validatedInput = signupSchema.safeParse(input);

    if (!validatedInput.success) {
      return { error: validatedInput.error.errors.map(e => e.message).join(', ') };
    }
    
    const { name, email,role, password } = validatedInput.data;

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return { error: 'User with this email already exists.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      role,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await usersCollection.insertOne(newUser);

    return { success: true };
  } catch (error) {
    console.error('Signup error:', error);
    return { error: 'An unexpected error occurred during signup.' };
  }
}

export async function signin(input: z.infer<typeof signinSchema>) {
  try {
    const validatedInput = signinSchema.safeParse(input);

    if (!validatedInput.success) {
      return { error: validatedInput.error.errors.map(e => e.message).join(', ') };
    }
    
    const { role, email, password } = validatedInput.data;

    const validate = await usersCollection.findOne({email, role});
    if(!validate)
      return {error : 'Email & Role Not Matched.'}

    const hashedPassword = await bcrypt.compare(password, validate.password);
    if(hashedPassword)
      return { success: true };  
    else  
      return {error : 'Email & Password Not Mached.'}

  } catch (error) {
    console.error('Signin error:', error);
    return { error: 'An unexpected error occurred during signup.' };
  }
}
