"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FaEnvelope, FaLock, FaTruck } from "react-icons/fa";
import { LoginForm, useLogin } from "@/schema/authSchema";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, errors, isSubmitting } = useLogin();

  async function onSubmit(data: LoginForm) {
    try {
      await login(data.email, data.senha);
      toast.success("Login realizado com sucesso!");
    } catch {
      toast.error("Email ou senha inválidos!");
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 m-4 text-white p-4 rounded-xl shadow-md shadow-blue-100">
            <FaTruck size={32} />
          </div>
          <h1 className="text-3xl font-bold text-blue-700 tracking-tight">
            LogiTrack Pro
          </h1>
          <p className="text-gray-400 text-sm mt-1 tracking-wide">
            Sistema de Gestão de Frotas
          </p>
        </div>

        <Card className="shadow-xl border border-blue-100 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2 pt-6 px-8">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Bem-vindo de volta 👋
            </CardTitle>
            <CardDescription className="text-gray-400">
              Entre com suas credenciais para continuar
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8 pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <Label className="text-gray-600 font-medium">Email</Label>
                <div className="relative">
                  <FaEnvelope
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300"
                    size={14}
                  />
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-9 border-gray-200 focus:border-blue-400 h-11"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-gray-600 font-medium">Senha</Label>
                <div className="relative">
                  <FaLock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300"
                    size={14}
                  />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-9 border-gray-200 focus:border-blue-400 h-11"
                    {...register("senha")}
                  />
                </div>
                {errors.senha && (
                  <p className="text-xs text-red-500">{errors.senha.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white h-11 text-base font-medium shadow-md shadow-blue-100 transition-all duration-200 mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  "Entrar"
                )}
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/register")}
                    className="text-blue-600 cursor-pointer hover:text-blue-700 font-medium hover:underline"
                  >
                    Crie uma conta
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-400 mt-6">
          LogiTrack Pro © 2026 — Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
