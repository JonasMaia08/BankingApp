'use client'
import React, { use, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { AuthformSchema } from '@/lib/utils'
import control from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'


const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter
  const [user, setUser] = useState(null)
  const [isLoading, setisLoading] = useState(false)
 

  const formSchema = AuthformSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true)
    
    try {
      //sign up appwrite e create token
      if (type === 'sign-up') {
        const newUser = await signUp(data);
        setUser(newUser);
        

        
      }
      if (type === 'sign-in') {
        // const response = await signIn({
        //     email: data.email,
        //     password: data.password
        // })
        // if (response) router.push('/')
      }
    } catch (error) {
      console.log(error);
    }finally {
      setisLoading(false)
    }
  }
  return (
    <div>
      <section className='auth-form '>
        <header className='w-screen flex flex-col gap-5 md:gap-8'>
          <Link href="/"
            className="flex
                    cursor-pointer
                    items-center gap-1">
            <Image
              src="/icons/logo.svg"
              width={34} height={34}
              alt='horizon logo'
            />
            <h1
              className='sidebartext-26 font-ibm-plex-serif font-bold text-black-1'
            >Bank</h1>
          </Link>
          <div className='flex flex-col gap-1 md:gap-3 '>
            <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
              {user
                ? 'Link Account'
                : type === 'sign-in'
                  ? 'Sign In'
                  : 'Sign Up'
              }
              <p className='text-16 font-normal text-gray-600'>
                {user
                  ? 'cadastre-se para começar'
                  : 'Digite suas informações'}
              </p>
            </h1>
          </div>
        </header>
        {user ? (
          <div className='flex flex-col gap-4 '>

          </div>
        ) :
          (<>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {type === 'sign-up' && (
                  <>
                    <div className='flex gap-4'>
                      <CustomInput control={form.control} name='firstName' label="Primeiro nome" placeholder='insira seu primeiro nome' />

                      <CustomInput control={form.control} name='lestName' label="Sobrenome" placeholder='insira seu Ultimo nome' />
                    </div>

                    <CustomInput control={form.control} name='adress1' label="Endereço" placeholder='insira seu Endereço' />
                    <CustomInput control={form.control} name='city' label="Cidade" placeholder='Insira sua cidade' />

                    <div className="flex gap-4">
                      <CustomInput control={form.control} name='state' label="Estado" placeholder='Exemplo: SP' />
                      <CustomInput control={form.control} name='postaCode' label="CEP" placeholder='Exemplo: 12506070' />
                    </div>

                    <div className="flex gap-4">
                      <CustomInput control={form.control} name='date0Birth' label="Data de nascimento" placeholder='DD-MM-YYYY' />
                      <CustomInput control={form.control} name='cpf' label="CPF" placeholder='Exemplo: 321.789.123-12' />
                    </div>

                  </>
                )}
                <CustomInput
                  control={form.control} name='email' label="Email" placeholder='insira seu Email' />

                <CustomInput
                  control={form.control} name='password' label="Senha" placeholder='insira sua senha' />
                <div className='flex flex-col gap-4'>
                  <Button type="submit" className='form-btn' disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp;
                        Carregando...
                      </>
                    ) : type === 'sign-in'
                      ? 'Sign In' : 'Sign up'}
                  </Button>
                </div>
              </form>
            </Form>
            <footer className='flex justify-center gap-1 '>
              <p className='text-14 font-normal text-gray-600' >
                {type === 'sign-in'
                  ? "Não tem uma conta?"
                  : "Já possui uma conta?"}
              </p>
              <Link className='form-links' href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
                {type === 'sign-in' ? 'Sign up' : 'Sign in'}
              </Link>
            </footer>
          </>
          )}
      </section>
    </div>
  )
}

export default AuthForm
