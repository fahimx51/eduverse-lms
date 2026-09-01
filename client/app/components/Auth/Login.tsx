'use client'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { styles } from '../../styles/style'
import { useLoginMutation } from '../../../redux/features/auth/authApi'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {
    setRoute: (route: string) => void,
    setOpen: (open: boolean) => void,
    redirectUrl?: string | null
}

const schema = Yup.object({
    email: Yup.string().email('Invalid email!').required('Please enter your email'),
    password: Yup.string().required('Please enter your password').min(6, 'Password must be at least 6 characters long')
})

export default function Login({ setRoute, setOpen, redirectUrl }: Props) {
    const [show, setShow] = useState(false);
    const [login, { isLoading, isSuccess, error }] = useLoginMutation();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            await login({ email, password });
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Login successfully!");
            setOpen(false);

            // Redirect to target path if stored, otherwise stay put
            if (redirectUrl) {
                router.push(redirectUrl);
            }
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData?.data?.message || "Something went wrong");
            }
        }
    }, [isSuccess, error, redirectUrl, router, setOpen]);

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className='w-full'>
            <h1 className={styles.title}>
                Login with EduVerse
            </h1>

            {redirectUrl && (
                <div className='bg-amber-100 dark:bg-amber-950/40 border border-amber-400 dark:border-amber-700 text-amber-800 dark:text-amber-300 px-3 py-2 rounded text-center text-[14px] my-3 font-poppins'>
                    Please log in to access this page.
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label
                    className={`${styles.label}`}
                    htmlFor="email">
                    Enter your email
                </label>
                <input
                    type="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder='yourmail@.com'
                    className={`${errors.email && touched.email && "border-red-500"} ${styles.input}`}
                />
                {errors.email && touched.email && (<span className='text-red-500 pt-2 block'>{errors.email}</span>)}

                <div className='w-full mt-5 relative mb-1'>
                    <label
                        className={`${styles.label}`}
                        htmlFor="password">
                        Enter your password
                    </label>

                    <input
                        type={show ? "text" : "password"}
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        placeholder='password'
                        className={`${errors.password && touched.password && "border-red-500"} ${styles.input}`}
                    />

                    {
                        !show ? (
                            <AiOutlineEyeInvisible
                                size={20}
                                className='absolute bottom-2.5 right-2 z-1 cursor-pointer dark:text-white'
                                onClick={() => setShow(true)}
                            />
                        )
                            : (
                                <AiOutlineEye
                                    size={20}
                                    className='absolute bottom-2.5 right-2 z-1 cursor-pointer dark:text-white'
                                    onClick={() => setShow(false)}
                                />
                            )
                    }

                </div>
                {errors.password && touched.password && (<span className='text-red-500 pt-2 block'>{errors.password}</span>)}

                <div className='w-full mt-5'>
                    <input
                        type="submit"
                        value="Login"
                        className={`${styles.button}`}
                    />
                </div>
                <br />
                <h5 className='text-center pt-4 font-poppins text-[14px] text-black dark:text-white'>
                    Or join with
                </h5>
                <div className='flex items-center justify-center my-3'>
                    <FcGoogle
                        size={30}
                        className='cursor-pointer mr-2'
                        onClick={() => signIn('google')}
                    />
                    <AiFillGithub
                        size={30}
                        className='cursor-pointer ml-2 dark:text-white'
                        onClick={() => signIn('github')}
                    />
                </div>

                <h5 className='text-center pt-4 font-poppins text-[14px] text-black dark:text-white'>
                    Not have an account?

                    <span
                        className='text-[#2190ff] cursor-pointer ml-2'
                        onClick={() => setRoute('Sign-Up')}
                    >
                        Sign Up
                    </span>
                </h5>
            </form>
        </div>
    )
}