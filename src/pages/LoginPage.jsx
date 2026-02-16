import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginThunk } from "../store/actions/thunks";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "", remember: false },
    mode: "onSubmit",
  });

  async function onSubmit(values) {
    const result = await dispatch(
      loginThunk({
        email: values.email,
        password: values.password,
        remember: values.remember,
      })
    );

    if (result.ok) navigate(from, { replace: true });
  }

  return (
    <div className="min-h-[calc(100vh-91px)] bg-[#FAFAFA]">
      <div className="max-w-[420px] mx-auto px-4 pt-16 pb-24">
        <div className="bg-white rounded-[10px] border border-[#E6E6E6] shadow-sm p-6">
          <h2 className="text-[20px] font-bold text-[#252B42]">Login</h2>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-[14px] font-semibold text-[#252B42] mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full h-11 px-3 rounded-[5px] border border-[#E6E6E6] text-[#252B42]
                           focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
                placeholder="customer@commerce.com"
                {...register("email", {
                  required: "Email zorunlu",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Geçerli bir email gir",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-[12px] text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#252B42] mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full h-11 px-3 rounded-[5px] border border-[#E6E6E6] text-[#252B42]
                           focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
                placeholder="123456"
                {...register("password", { required: true })}
              />
            </div>

            <label className="flex items-center gap-2 text-[14px] text-[#737373]">
              <input type="checkbox" className="accent-[#23A6F0]" {...register("remember")} />
              Remember me
            </label>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full h-[52px] rounded-[5px] bg-[#23A6F0] text-white font-bold
                         disabled:opacity-60"
            >
              {isSubmitting ? "Gönderiliyor..." : "Giriş Yap"}
            </button>

            <p className="text-[12px] text-[#737373]">
              Test kullanıcıları (şifre: 123456): customer@commerce.com, store@commerce.com,
              admin@commerce.com
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}