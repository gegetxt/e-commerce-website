import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

// Email
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password: min 8 + upper + lower + number + special
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

// TR phone: 05xxxxxxxxx / +905xxxxxxxxx
const trPhonePattern = /^(?:\+90\s?)?0?5\d{9}$/;

// Tax No: TXXXXVXXXXXX (X digits)
const taxNoPattern = /^T\d{4}V\d{6}$/;

// TR IBAN: TR + 24 digits
const ibanPattern = /^TR\d{24}$/;

function normalizeRoleName(name = "") {
  return String(name).trim().toLowerCase();
}
function isStoreRoleName(name = "") {
  const n = normalizeRoleName(name);
  // İngilizce/Türkçe olasılıklar
  return n.includes("store") || n.includes("mağaza") || n.includes("magaza");
}
function isCustomerRoleName(name = "") {
  const n = normalizeRoleName(name);
  return n.includes("customer") || n.includes("müşteri") || n.includes("musteri");
}

export default function SignupPage() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
      role_id: "",

      // store nested -> UI alanları (payload'a map edeceğiz)
      storeName: "",
      storePhone: "",
      storeTaxNo: "",
      storeBankAccount: "",
    },
  });

  // Roles fetch + default Customer
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoadingRoles(true);
        const res = await api.get("/roles");
        const list = Array.isArray(res.data) ? res.data : [];
        if (!mounted) return;

        setRoles(list);

        // Customer default
        const customer = list.find((r) => isCustomerRoleName(r?.name));
        const defaultId = customer?.id ?? list?.[0]?.id ?? "";
        setValue("role_id", String(defaultId));
      } catch (e) {
        if (!mounted) return;
        setSubmitError("Roller alınamadı. Lütfen tekrar deneyin.");
      } finally {
        if (mounted) setLoadingRoles(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [setValue]);

  const roleId = watch("role_id");
  const selectedRole = useMemo(
    () => roles.find((r) => String(r.id) === String(roleId)),
    [roles, roleId]
  );

  const isStore = isStoreRoleName(selectedRole?.name);

  async function onSubmit(values) {
    setSubmitError("");

    // ✅ Backend exact format (extra field yok)
    const basePayload = {
      name: values.name,
      email: values.email,
      password: values.password,
      role_id: Number(values.role_id),
    };

    const payload = isStore
      ? {
          ...basePayload,
          store: {
            name: values.storeName,
            phone: values.storePhone,
            tax_no: values.storeTaxNo,
            bank_account: values.storeBankAccount,
          },
        }
      : basePayload;

    try {
      await api.post("/signup", payload);

      alert("You need to click link in email to activate your account!");
      navigate(-1);
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        "Signup başarısız. Aynı email ile tekrar kayıt yapmaya çalışıyor olabilirsin.";
      setSubmitError(msg);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[520px] mx-auto px-4 py-10">
        <h1 className="text-[28px] font-bold text-[#252B42]">Sign Up</h1>

        {submitError && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-[#252B42]">Name</label>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
              })}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-[#252B42]">Email</label>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              {...register("email", {
                required: "Email is required",
                pattern: { value: emailPattern, message: "Email is not valid" },
              })}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-[#252B42]">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border px-3 py-2"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: passwordPattern,
                  message: "Min 8 chars + upper/lower/number/special required",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Password again */}
          <div>
            <label className="block text-sm font-bold text-[#252B42]">Password (again)</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border px-3 py-2"
              {...register("password2", {
                required: "Please confirm password",
                validate: (v, all) => v === all.password || "Passwords do not match",
              })}
            />
            {errors.password2 && (
              <p className="mt-1 text-xs text-red-600">{errors.password2.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-bold text-[#252B42]">Role</label>
            <select
              className="mt-1 w-full rounded-md border px-3 py-2"
              disabled={loadingRoles}
              {...register("role_id", { required: "Role is required" })}
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            {errors.role_id && (
              <p className="mt-1 text-xs text-red-600">{errors.role_id.message}</p>
            )}
          </div>

          {/* Store fields (only if Store/Mağaza) */}
          {isStore && (
            <div className="rounded-md border p-4 space-y-4">
              <p className="font-bold text-[#252B42]">Store Info</p>

              <div>
                <label className="block text-sm font-bold text-[#252B42]">Store Name</label>
                <input
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  {...register("storeName", {
                    required: "Store name is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                  })}
                />
                {errors.storeName && (
                  <p className="mt-1 text-xs text-red-600">{errors.storeName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#252B42]">
                  Store Phone (Türkiye)
                </label>
                <input
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="05xxxxxxxxx veya +905xxxxxxxxx"
                  {...register("storePhone", {
                    required: "Phone is required",
                    pattern: { value: trPhonePattern, message: "Invalid TR phone number" },
                  })}
                />
                {errors.storePhone && (
                  <p className="mt-1 text-xs text-red-600">{errors.storePhone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#252B42]">Store Tax ID</label>
                <input
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="T1234V123456"
                  {...register("storeTaxNo", {
                    required: "Tax ID is required",
                    pattern: { value: taxNoPattern, message: "Format must be TXXXXVXXXXXX" },
                  })}
                />
                {errors.storeTaxNo && (
                  <p className="mt-1 text-xs text-red-600">{errors.storeTaxNo.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#252B42]">
                  Store Bank Account (IBAN)
                </label>
                <input
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="TR00xxxxxxxxxxxxxxxxxxxxxxxx"
                  {...register("storeBankAccount", {
                    required: "IBAN is required",
                    pattern: { value: ibanPattern, message: "Invalid TR IBAN (TR + 24 digits)" },
                  })}
                />
                {errors.storeBankAccount && (
                  <p className="mt-1 text-xs text-red-600">{errors.storeBankAccount.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-[52px] rounded-[5px] font-bold text-[14px] tracking-[0.2px]
              ${isSubmitting ? "bg-[#23A6F0]/60 cursor-not-allowed" : "bg-[#23A6F0] hover:bg-[#1e8fd1]"}
              text-white transition-colors flex items-center justify-center gap-2`}
          >
            {isSubmitting && (
              <span className="w-4 h-4 rounded-full border-2 border-white/60 border-t-white animate-spin" />
            )}
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}