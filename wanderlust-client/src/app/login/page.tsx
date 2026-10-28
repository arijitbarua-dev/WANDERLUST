'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function LoginForm() {
    const router = useRouter()

    const [loginError, setLoginError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleEmailLogIn = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        setLoginError("")
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)

        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            })

            if (error) {
                setLoginError(error.message || "Unable to log in.")
                return
            }

            if (data) {
                router.replace("/")
            }
        } catch {
            setLoginError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-98 bg-[#f8f9fb] px-4 py-9">
            <div className="mx-auto flex w-full flex-col items-center">

                {/* Heading */}
                <div className="mb-5 text-center">
                    <h1 className="text-3xl font-bold leading-9 tracking-tight text-[#111111]">
                        Welcome Back
                    </h1>
                    <p className="text-sm leading-5 text-gray-500">
                        Resume your adventure with Wanderlust
                    </p>
                </div>

                {/* Login Card */}
                <Card className="w-full max-w-95 rounded-sm border border-gray-100 bg-white shadow-[0_2px_3px_rgba(0,0,0,0.12)]">
                    <CardContent className="p-6">
                        <form onSubmit={handleEmailLogIn}>

                            {loginError && (
                                <p
                                    className="mb-3 text-sm text-red-500"
                                    role="alert"
                                >
                                    {loginError}
                                </p>
                            )}

                            <FieldGroup className="gap-4">

                                {/* Email */}
                                <Field className="gap-1.5">
                                    <FieldLabel
                                        htmlFor="email"
                                        className="text-sm font-medium text-black"
                                    >
                                        Email Address
                                    </FieldLabel>

                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                            ✉
                                        </span>

                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            autoComplete="email"
                                            required
                                            className="h-9 rounded-none border-gray-100 bg-[#f8f9fb] pl-9 text-sm shadow-none placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#159fba]"
                                        />
                                    </div>
                                </Field>

                                {/* Password */}
                                <Field className="gap-1.5">
                                    <FieldLabel
                                        htmlFor="password"
                                        className="text-sm font-medium text-black"
                                    >
                                        Password
                                    </FieldLabel>

                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                            ♙
                                        </span>

                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            required
                                            className="h-9 rounded-none border-gray-100 bg-[#f8f9fb] pl-9 text-sm shadow-none placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#159fba]"
                                        />
                                    </div>
                                </Field>

                                {/* Remember me and Forgot password */}
                                <div className="-mt-1 flex items-center justify-between gap-2 text-xs">
                                    <label
                                        htmlFor="remember"
                                        className="flex cursor-pointer items-center gap-2 text-gray-600"
                                    >
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="size-3 accent-[#159fba]"
                                        />
                                        Remember me
                                    </label>

                                    <a
                                        href="/forgot-password"
                                        className="text-[#009fbd] hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Sign In */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="h-10 w-full rounded-none bg-[#19a0b9] text-sm font-normal text-white shadow-none hover:bg-[#148ba2]"
                                >
                                    {isLoading ? "Signing In..." : "Sign In"}
                                </Button>

                                {/* Divider */}
                                <div className="flex items-center gap-3 py-1">
                                    <div className="h-px flex-1 bg-gray-100" />

                                    <span className="text-xs text-gray-500">
                                        Or continue with
                                    </span>

                                    <div className="h-px flex-1 bg-gray-100" />
                                </div>

                                {/* Google Sign In */}
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="h-10 w-full gap-2 rounded-none border-gray-200 bg-white text-sm font-normal text-black shadow-none hover:bg-gray-50"
                                >
                                    <Image
                                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                        alt="Google"
                                        width={16}
                                        height={16}
                                        className="shrink-0"
                                    />
                                    Sign Up With Google
                                </Button>

                                {/* Sign Up Link */}
                                <FieldDescription className="pt-1 text-center text-xs text-gray-500">
                                    Don&apos;t have an account?{" "}
                                    <a
                                        href="/signup"
                                        className="font-medium text-[#009fbd] hover:underline"
                                    >
                                        Sign Up
                                    </a>
                                </FieldDescription>

                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}