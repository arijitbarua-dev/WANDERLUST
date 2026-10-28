'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { User, Mail, Lock } from "lucide-react"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const SignUpPage = () => {
    const router = useRouter();
    const [passwordError, setPasswordError] = useState("")
    const [signupError, setSignupError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleEmailSignUp = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        setPasswordError("")
        setSignupError("")

        const formData = new FormData(e.currentTarget)

        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const confirmPassword = formData.get("confirm-password") as string

        // Validate password confirmation
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match. Please try again.")
            return
        }

        setIsLoading(true)

        try {
            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
            })

            if (error) {
                setSignupError(error.message || "Unable to create your account.")
                return
            }

            if (data) {
                console.log("Account created successfully:", data)
                router.replace('/')
            }
        } catch {
            setSignupError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-100 bg-[#f8f9fb] px-4 py-10 sm:py-12">
            <div className="mx-auto w-full max-w-85">
                <div className="mb-5 text-center">
                    <h1 className="text-2xl font-normal tracking-tight text-[#171717]">
                        Create Account
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Start your adventure with Wanderlust
                    </p>
                </div>

                <Card className="gap-0 rounded-none border border-gray-100 bg-white py-0 shadow-sm">
                    <CardHeader className="p-5 pb-3">
                        <CardTitle className="sr-only">
                            Create an account
                        </CardTitle>
                        <CardDescription className="sr-only">
                            Enter your information below to create your account
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-5 pb-5 pt-0">
                        <form onSubmit={handleEmailSignUp}>
                            <FieldGroup className="gap-4">
                                <Field className="gap-1.5">
                                    <FieldLabel
                                        htmlFor="name"
                                        className="text-sm font-medium text-black"
                                    >
                                        Full Name
                                    </FieldLabel>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Enter your name"
                                            autoComplete="name"
                                            required
                                            className="h-10 rounded-none border-gray-200 bg-[#f7f8fa] pl-9 text-sm shadow-none placeholder:text-gray-500 focus-visible:ring-1"
                                        />
                                    </div>
                                </Field>

                                <Field className="gap-1.5">
                                    <FieldLabel
                                        htmlFor="email"
                                        className="text-sm font-medium text-black"
                                    >
                                        Email Address
                                    </FieldLabel>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            autoComplete="email"
                                            required
                                            className="h-10 rounded-none border-gray-200 bg-[#f7f8fa] pl-9 text-sm shadow-none placeholder:text-gray-500 focus-visible:ring-1"
                                        />
                                    </div>
                                </Field>

                                <Field className="gap-1.5">
                                    <FieldLabel
                                        htmlFor="password"
                                        className="text-sm font-medium text-black"
                                    >
                                        Password
                                    </FieldLabel>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Create a password"
                                            autoComplete="new-password"
                                            minLength={8}
                                            required
                                            onChange={() => {
                                                setPasswordError("")
                                                setSignupError("")
                                            }}
                                            className="h-10 rounded-none border-gray-200 bg-[#f7f8fa] pl-9 text-sm shadow-none placeholder:text-gray-500 focus-visible:ring-1"
                                        />
                                    </div>
                                </Field>

                                <Field className="gap-1.5">
                                    <FieldLabel
                                        htmlFor="confirm-password"
                                        className="text-sm font-medium text-black"
                                    >
                                        Confirm Password
                                    </FieldLabel>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                        <Input
                                            id="confirm-password"
                                            name="confirm-password"
                                            type="password"
                                            placeholder="Confirm your password"
                                            autoComplete="new-password"
                                            required
                                            onChange={() => {
                                                setPasswordError("")
                                                setSignupError("")
                                            }}
                                            aria-invalid={!!passwordError}
                                            aria-describedby={
                                                passwordError
                                                    ? "password-error"
                                                    : undefined
                                            }
                                            className="h-10 rounded-none border-gray-200 bg-[#f7f8fa] pl-9 text-sm shadow-none placeholder:text-gray-500 focus-visible:ring-1"
                                        />
                                    </div>

                                    {passwordError && (
                                        <p
                                            id="password-error"
                                            role="alert"
                                            className="text-sm text-red-500"
                                        >
                                            {passwordError}
                                        </p>
                                    )}
                                </Field>

                                {signupError && (
                                    <p
                                        role="alert"
                                        className="text-sm text-red-500"
                                    >
                                        {signupError}
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="mt-1 h-10 w-full rounded-none bg-[#17a2bb] text-sm font-medium text-white hover:bg-[#138da3]"
                                >
                                    {isLoading
                                        ? "Creating Account..."
                                        : "Create Account"}
                                </Button>

                                <div className="flex items-center gap-3 py-1">
                                    <div className="h-px flex-1 bg-gray-200" />
                                    <span className="text-xs text-gray-500">
                                        Or sign up with
                                    </span>
                                    <div className="h-px flex-1 bg-gray-200" />
                                </div>

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

                                <p className="pt-1 text-center text-xs text-gray-500">
                                    Already have an account?{" "}
                                    <a
                                        href="/login"
                                        className="font-semibold text-[#17a2bb] hover:underline"
                                    >
                                        Sign In
                                    </a>
                                </p>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

export default SignUpPage;