'use client'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { styles } from '../../styles/style'

type Props = {
    setRoute: (route: string) => void
}

const schema = Yup.object({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string().email('Invalid email!').required('Please enter your email'),
    password: Yup.string().required('Please enter your password').min(6, 'Password must be at least 6 characters long')
})

export default function SignUp({ setRoute }: Props) {
    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: async ({ name, email, password }) => {
            console.log(name, email, password);
            setRoute('Verfication');
        }
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className='w-full'>
            <h1 className={styles.title}>
                Join to EduVerse
            </h1>

            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label
                        className={`${styles.label}`}
                        htmlFor="name">
                        Enter your name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder='John Doe'
                        className={`${errors.email && touched.email && "border-red-500"} ${styles.input}`}
                    />
                    {errors.name && touched.name && (<span className='text-red-500 pt-2 block'>{errors.name}</span>)}
                </div>

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
                        value="Sign Up"
                        className={`${styles.button}`}
                    />
                </div>
                <br />
                <h5 className='text-center pt-4 font-poppins text-[14px] text-black dark:text-white'>
                    Or join with
                </h5>
                <div className='flex items-center justify-center my-3'>
                    <FcGoogle size={30} className='cursor-pointer mr-2 ' />
                    <AiFillGithub size={30} className='cursor-pointer ml-2 dark:text-white' />
                </div>

                <h5 className='text-center pt-4 font-poppins text-[14px] text-black dark:text-white'>
                    Already have an account?

                    <span
                        className='text-[#2190ff] cursor-pointer ml-2'
                        onClick={() => setRoute('Login')}
                    >
                        Sign In
                    </span>
                </h5>
            </form>
        </div >
    )
}
